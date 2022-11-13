<template>
  <div
    class="absolute transition-all ease-out duration-100 z-50 mx-auto left-0 top-4 right-0 p-8 bg-white max-w-md rounded shadow"
  >
    <div>
      <h1 class="text-2xl font-bold">{{ event.context }}</h1>
      <p>{{ event.description }}</p>
    </div>
    <div class="mt-2 flex gap-1">
      <button @click="confirm(true)" class="px-4 rounded shadow bg-green-400">Yes</button>
      <button @click="confirm(false)" class="px-4 rounded shadow bg-red-400">No</button>
      <button @click="confirm(null)" class="px-4 rounded shadow bg-gray-400">idk</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  auth: String,
  user: String,
  event: Object,
});

console.log(props['event']);

const emits = defineEmits(['removeConfirmationEvent']);

async function confirm(answer) {
  if (answer) {
    const req = {
      auth: props['auth'],
      thread_id: props['event'].thread_id,
      content: `${props['user']} confirmed this is still happening.`,
      confirm: true,
    };

    const data = await fetch('http://localhost:3000/create_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    const json = data.status;
    console.log(json);
  }

  emits('removeConfirmationEvent', props['event'].id);
}
</script>
