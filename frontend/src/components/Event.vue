<template>
  <div
    v-if="active_event"
    class="absolute top-0 left-0 right-0 mx-auto z-50 max-w-lg p-8 bg-white shadow rounded"
  >
    <h1 class="text-2xl font-bold">{{ active_event.context }}</h1>
    <div class="flex flex-wrap">
      <div class="px-4 py-1 rounded bg-gray-400" v-for="tag in active_event.tags">
        {{ tag }}
      </div>
      <p>{{ active_event.description }}</p>
      <p>{{ active_event.owner }}</p>
    </div>
    <hr />
    <div class="flex flex-col">
      <div v-for="post in active_event.thread.posts">
        <div class="flex">{{ post.owner }}{{ post.content }}{{ post.time_stamp }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  active_event: Object,
});
</script>
