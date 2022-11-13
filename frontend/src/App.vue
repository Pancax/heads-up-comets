<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { io } from 'socket.io-client';

const socket = ref(io('http://localhost:3000'));

onMounted(() => {
  // socket.value.on('update', () => console.log('meow'));
});

onBeforeUnmount(() => socket.disconnect());
</script>

<template>
  <RouterView :socket="socket" />
</template>
