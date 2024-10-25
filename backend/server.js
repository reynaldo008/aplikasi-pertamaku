import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json());

// Perbaikan CORS - Batasi origin hanya ke domain yang terpercaya
app.use(cors({
  origin: 'domain yang dipercaya', //masukan domain yang dipercaya disini.
  optionsSuccessStatus: 200,
}));

const connection = new sqlite3.Database('./db/aplikasi.db');

// Rute untuk mendapatkan data user berdasarkan ID (Perbaikan SQL Injection)
app.get('/api/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  connection.all(query, [req.params.id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
});

// Rute untuk mengubah email user (Perbaikan SQL Injection & Validasi Input)
app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = req.body.email;

  // Validasi email menggunakan regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    return res.status(400).send('Invalid email format');
  }

  const query = `UPDATE users SET email = ? WHERE id = ?`;
  connection.run(query, [newEmail, req.params.id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (this.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('Email updated successfully');
  });
});

// Rute untuk mengirimkan file (Perbaikan Directory Traversal)
app.get('/api/file', (req, res) => {
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename); 

  const allowedFiles = ['file1.txt', 'file2.txt']; // Daftar file yang diizinkan
  const requestedFile = req.query.name;

  if (!allowedFiles.includes(requestedFile)) {
    return res.status(400).send('File not allowed');
  }

  const filePath = path.join(__dirname, 'files', requestedFile);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error serving file');
    }
  });
});

// Penanganan error untuk rute tidak ditemukan
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
