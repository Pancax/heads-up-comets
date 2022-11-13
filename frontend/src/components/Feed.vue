<template>
  <div
    :class="menu_toggle ? 'w-4/12' : 'w-0'"
    class="absolute z-50 left-0 top-0 bottom-0 h-full flex flex-col bg-white shadow-xl p-8"
  >
    <button
      @click="menu_toggle = !menu_toggle"
      :class="menu_toggle ? 'right-4 top-4' : 'left-2'"
      class="absolute w-12 bg-white text-orange-400 rounded-full shadow aspect-square"
    >
      <i :class="menu_toggle ? 'fa-xmark' : 'fa-bars'" class="fa-solid"></i>
    </button>
    <p :class="menu_toggle ? '' : 'hidden'" class="text-orange-400 text-md">
      <i class="font-bold fa-solid fa-meteor"></i
      ><span class="text-green-900">
        Heads Up, <span class="font-bold">{{ user }}</span
        >!</span
      >
    </p>
    <h2
      :class="menu_toggle ? '' : 'hidden'"
      class="text-gray-800 mt-4 text-3xl font-bold"
    >
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
        <div class="flex gap-2 align-middle items-center">
          <h1 class="font-bold text-lg text-gray-800">{{ event.context }}</h1>
          <p class="text-sm text-gray-400">by {{ event.owner }}</p>
        </div>
        <div class="mt-1 flex gap-1">
          <div
            class="px-2 text-xs bg-gray-300 text-gray-800 rounded"
            v-for="tag in event.tags"
            :class="tag.replace(' ', '')"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <button :class="menu_toggle ? '' : 'hidden'">
        <router-link to="/login"
          ><i class="text-orange-400 fa-solid fa-right-from-bracket"></i> Log
          Out</router-link
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: String,
  events: Array,
});

const emits = defineEmits(['updateActiveEvent']);

const setActiveEvent = (event) => {
  emits('updateActiveEvent', event);
};

const menu_toggle = ref(false);
</script>
