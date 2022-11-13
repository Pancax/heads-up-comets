<template>
  <div class="relative w-full">
    {{ events2 }}
    <div id="map" class="z-0 w-full h-screen"></div>
    <div
      :class="event_modal_toggle ? '' : 'opacity-0 -translate-y-[440px]'"
      class="absolute top-32 left-0 right-0 mx-auto max-w-sm p-6 transition-all ease-in duration-300 bg-white rounded shadow"
    >
      <div class="flex justify-between">
        <h2 class="font-bold text-gray-800 text-lg">Create Event</h2>
        <button @click="event_modal_toggle = false">
          <i class="fa-solid fa-xmark"></i><span class="sr-only">Close</span>
        </button>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <div class="flex gap-2 align-middle">
          <label class="text-gray-500" for="">Name</label>
          <input
            v-model="context"
            class="border rounded border-gray-500"
            type="text"
            placeholder="HackUTD IX"
          />
        </div>
        <div class="flex gap-2 align-middle">
          <label class="text-gray-500" for="">Tags</label>
          <input
            v-model="tags"
            class="border rounded border-gray-500"
            type="text"
            placeholder="Code, Fun, Social..."
          />
        </div>
        <div class="flex gap-2 align-middle">
          <label class="text-gray-500" for="">Description</label>
          <textarea
            v-model="description"
            class="border rounded border-gray-500"
            type="text"
            placeholder="Come hack some stuff and eat some burgers 🍔"
          ></textarea>
        </div>

        <button @click="createEvent" class="mt-4 bg-sky-400 rounded py-4 text-white">
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L, { map } from 'leaflet';

const props = defineProps(['events2']);

let mapDiv;
const context = ref(null);
const tags = ref(null);
const description = ref(null);
const latlng = ref(null);

const event_modal_toggle = ref(false);

const center = [32.986175387437946, -96.75014222885781];

onMounted(() => {
  mapDiv = L.map('map').setView(center, 16);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapDiv);

  L.circleMarker([32.986175387437946, -96.75014222885781], { radius: 1 * 5 * 3 }).addTo(
    mapDiv
  );

  mapDiv.on('click', (e) => {
    event_modal_toggle.value = true;
    latlng.value = e.latlng;
  });
});

console.log(props['events2']);

for (e in props.events2) {
  L.circleMarker(e.latlng, { radius: e.count * 5 * 3 }).addTo(mapDiv);
}

const createCircle = (circle) => {
  L.circleMarker(circle.latlng, { radius: circle.count * 5 * 3 }).addTo(mapDiv);
};

const createEvent = () => {
  createCircle({ latlng: latlng.value, count: 1 });
  console.log(latlng.value);
  event_modal_toggle.value = false;
  context.value = null;
  tags.value = null;
  description.value = null;
  latlng.value = null;
};
</script>

<style scoped>
input,
textarea {
  width: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding-inline: 0.25rem;
}

label {
  flex-shrink: 1;
  flex-basis: 84px;
}
</style>
