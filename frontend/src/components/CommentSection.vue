<script setup>
import { ref } from 'vue';
import DOMPurify from 'dompurify'; // Import DOMPurify untuk sanitasi

const comment = ref('');
const comments = ref('');

// Gunakan DOMPurify untuk membersihkan input sebelum menambahkannya ke comments
const submitComment = () => {
  const sanitizedComment = DOMPurify.sanitize(`<p>${comment.value}</p>`);
  comments.value += sanitizedComment;
  comment.value = '';
};
</script>

<template>
  <div>
    <h3>Comments</h3>
    <input v-model="comment" placeholder="Leave a comment" />
    <button @click="submitComment">Submit</button>
    <!-- comments di-render menggunakan v-html, pastikan input telah disanitasi -->
    <div v-html="comments"></div>
  </div>
</template>
