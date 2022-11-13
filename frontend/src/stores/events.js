import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useEventStore = defineStore('events', () => {
  const events = ref([]);
  const active_event = ref(null);

  function updateEvents(events) {
    this.events = events;
  }

  function setActiveEvent(event) {
    active_event.value = event;
  }

  function createEvent(event) {
    this.events.push(event);
  }

  const getEvents = computed(() => events);
  const getActiveEvent = computed(() => active_event);

  function createPost(post) {}

  function editPost(threadID, post) {}

  return { events, updateEvents, setActiveEvent, getEvents, getActiveEvent };
});
