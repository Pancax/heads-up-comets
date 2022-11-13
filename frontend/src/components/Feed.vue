<template>
  <div
    :class="menu_toggle ? 'w-4/12' : 'w-0'"
    class="absolute z-50 left-0 top-0 bottom-0 h-full flex flex-col bg-gray-200/60 backdrop-blur-sm shadow-xl p-8"
  >
    <button
      @click="menu_toggle = !menu_toggle"
      :class="menu_toggle ? 'right-4 top-4' : 'left-2'"
      class="absolute w-12 bg-white rounded-full shadow aspect-square"
    >
      <i :class="menu_toggle ? 'fa-xmark' : 'fa-bars'" class="fa-solid"></i>
    </button>
    <h2 :class="menu_toggle ? '' : 'hidden'" class="text-gray-800 text-3xl font-bold">
      Feed
    </h2>
    <div
      :class="menu_toggle ? '' : 'hidden'"
      class="grow mt-6 items flex flex-col gap-4 place-items-center"
    >
      <div
        class="item w-full p-4 bg-white rounded shadow cursor-pointer"
        v-for="event in events"
        @click="setActiveEvent(event)"
      >
        <h1 class="font-bold text-lg text-gray-800">{{ event.context }}</h1>
        <div class="mt-1 flex gap-1">
          <div class="px-2 bg-gray-600 text-white rounded" v-for="tag in event.tags">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div :class="menu_toggle ? '' : 'hidden'" class="flex gap-2 place-items-center">
      <div class="w-16 aspect-square rounded-full overflow-hidden">
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          alt="Avatar Profile Picture"
        />
      </div>
      <p>Welcome, John Smith!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEventStore } from '../stores/events';
const store = useEventStore();

const props = defineProps({
  events: Array,
});

const setActiveEvent = (event) => {
  console.log(event);
  store.setActiveEvent(event);
};

const menu_toggle = ref(false);
</script>
