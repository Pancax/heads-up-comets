<template>
  <div
    v-if="event"
    class="absolute top-0 left-0 right-0 mx-auto z-50 max-w-lg p-8 bg-white shadow rounded"
  >
    <h1 class="text-2xl font-bold">{{ event.context }}</h1>
    <div class="flex flex-wrap">
      <div class="px-4 py-1 rounded bg-gray-400" v-for="tag in event.tags">
        {{ tag }}
      </div>
      <p>{{ event.description }}</p>
      <p>{{ event.author }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useEventStore } from '../stores/events';
const store = useEventStore();

const event = store.getActiveEvent;
</script>
