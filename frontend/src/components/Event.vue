<template>
  <div
    v-if="active_event"
    class="absolute top-8 right-[15%] mx-auto z-50 max-w-lg w-full p-8 bg-white shadow rounded"
  >
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">
        {{ active_event.context }}
        <span class="text-sm text-gray-300"> by {{ active_event.owner }}</span>
      </h1>
      <button @click="active_event = null">
        <i class="fa-solid fa-xmark"></i><span class="sr-only">Close</span>
      </button>
    </div>
    <div class="flex gap-2 items-center flex-wrap">
      <div
        class="px-2 text-xs bg-gray-300 text-gray-800 rounded"
        v-for="tag in active_event.tags"
        :class="tag.replace(' ', '')"
      >
        {{ tag }}
      </div>
    </div>
    <p class="mt-2 text-gray-600">{{ active_event.description }}</p>
    <hr class="mt-4" />
    <div class="max-h-[300px] overflow-y-scroll">
      <div class="py-4 px-1 bg-gradient-to-b from-white to-gray-50 flex flex-col">
        <div v-for="post in active_event.thread.posts">
          <div class="flex">{{ getAuthor(post) }} {{ post.content }}</div>
        </div>
      </div>
    </div>
    <div class="flex">
      <input
        class="w-full border-b border-gray-200 px-1 py-1 focus:outline-none"
        type="text"
        v-model="post_input"
        placeholder="Say something..."
      />
      <button
        @click="sendPost"
        class="text-sm bg-gradient-to-br from-yellow-200 to-orange-400 rounded-sm px-4 py-1"
      >
        Post
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  auth: String,
  user: String,
  active_event: Object,
});

const emits = defineEmits(['updateActiveEvent']);

const post_input = ref(null);

async function sendPost() {
  if (post_input.value) {
    const payload = {
      auth: props['auth'],
      thread_id: props['active_event'].thread_id,
      user: props['user'],
      content: post_input.value,
      confirm: false,
    };
    await fetch('http://localhost:3000/create_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }

  post_input.value = '';
  emits('updateActiveEvent', null);
}

function getAuthor(post) {
  return post.content.includes(post.owner) ? '' : `${post.owner}: `;
}
</script>
