<script setup>
import { onBeforeMount } from 'vue';
import { useSocketStore } from '@/stores/socket.js';

const store = useSocketStore();
store.setup();

onBeforeMount(() => store.disconnect());
</script>

<template>
  <RouterView />
</template>
