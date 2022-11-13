<template>
  <div class="relative">
    <Map :events2="events" />
    <Feed :events="events" />
    <Event />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Feed from '@/components/Feed.vue';
import Map from '@/components/Map.vue';
import Event from '@/components/Event.vue';
import { useEventStore } from '@/stores/events.js';

const store = useEventStore();
let events = ref(store.getEvents);
onMounted(async () => {
  const response = await fetch('http://localhost:3000/get_events?tags=', {
    redirect: 'manual',
  });
  const events_json = await response.json();
  store.updateEvents(events_json);
  events = store.getEvents;
});

const props = defineProps({
  user: String,
  auth: String,
});
</script>
