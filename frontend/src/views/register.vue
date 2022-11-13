<template>
  <div class="w-full h-screen bg-gradient-to-br from-yellow-400 to-orange-500">
    <h1 class="font-bold text-white text-lg p-8">
      <i class="fa-solid fa-meteor"></i> Heads Up!
    </h1>
    <div class="pt-16">
      <div
        class="flex flex-col gap-4 place-items-center mx-auto w-full py-10 px-8 max-w-sm bg-white rounded shadow"
      >
        <h1 class="text-3xl text-green-900 font-bold">Register</h1>
        <div class="flex flex-col grow w-full">
          <label class="text-gray-500" for="stuid-field">Student ID</label>
          <input
            class="border-b focus:outline-none border-b-gray-400 px-1 py-2"
            type="text"
            v-model="username"
          />
        </div>
        <div class="flex flex-col grow w-full">
          <label class="text-gray-500" for="pass-field">Password</label>
          <input
            class="border-b focus:outline-none border-b-gray-400 px-1 py-2"
            type="password"
            v-model="password"
          />
        </div>

        <button
          @click="login"
          class="mt-4 w-full bg-green-600 px-8 py-3 text-white shadow-md rounded"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  socket: Object,
});

const router = useRouter();

const username = ref(null);
const password = ref(null);

const login = async () => {
  const data = await fetch('http://localhost:3000/create_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: username.value, pass: password.value }),
  });
  const status = data.status;
  if (status == 200) {
    const userRes = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: username.value, pass: password.value }),
    });
    const auth = await userRes.text();
    if (auth == 'Username not found.') {
      alert('Username not found');
    } else if (auth == 'Incorrect Password.') {
      alert('Incorrect password');
    } else if (auth) {
      props['socket'].emit('login', auth);
      router.push({ path: '/map', query: { user: username.value, auth: auth } });
    }
  } else if (status == 400) {
    const message = await data.text();
    if (message == 'Username already exists.') {
      alert('Username already exists.');
    } else {
      alert('Error');
    }
  }

  username.value = null;
  password.value = null;
};
</script>
