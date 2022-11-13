<template>
  <div class="relative">
    <Feed :user="user" :events="events" @updateActiveEvent="updateActive_Event" />
    <Map :auth="auth" :events="events" />
    <Event :user="user" :auth="auth" :active_event="active_event" />
    <div v-for="e of confirmations">
      <ConfirmBox
        :auth="auth"
        :event="e"
        :user="user"
        @removeConfirmationEvent="removeConfirmation_Event"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Feed from '@/components/Feed.vue';
import Map from '@/components/Map.vue';
import Event from '@/components/Event.vue';
import ConfirmBox from '../components/ConfirmBox.vue';

const props = defineProps({
  user: String,
  auth: String,
  socket: Object,
});

const events = ref(null);
const active_event = ref(null);

const confirmations = ref([]);

async function updateActive_Event(event) {
  const res = await fetch(`http://localhost:3000/get_event?event_id=${event.id}`);
  const json = await res.json();
  active_event.value = json;
  console.log(active_event.value);
}

function removeConfirmation_Event(event_id) {
  for (let i = 0; i < confirmations.value.length; i++) {
    if (confirmations.value[i].id == event_id) {
      confirmations.value.splice(i, 1);
      break;
    }
  }
}

onMounted(async () => {
  const response = await fetch('http://localhost:3000/get_events?tags=', {
    redirect: 'manual',
  });
  const events_json = await response.json();
  events.value = events_json;

  props['socket'].on('update', async () => {
    const res = await fetch('http://localhost:3000/get_events?tags=', {
      redirect: 'manual',
    });
    const json = await res.json();

    events.value = json;
  });

  props['socket'].on('confirm_events', (events) => {
    confirmations.value.push(...events);
    console.log(confirmations.value);
  });
});
</script>
