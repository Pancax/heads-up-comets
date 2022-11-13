<template>
  <div class="w-full h-screen bg-gradient-to-br from-gray-50 to-sky-400">
    <div class="pt-16">
      <div
        class="flex flex-col gap-4 place-items-center mx-auto w-full py-10 px-8 max-w-sm bg-white rounded shadow"
      >
        <h1 class="text-3xl text-gray-800 font-bold">Login</h1>
        <div class="flex flex-col grow w-full">
          <label class="text-gray-500" for="stuid-field">Student ID</label>
          <input
            class="border-b border-b-gray-400 px-1 py-2"
            type="text"
            v-model="username"
          />
        </div>
        <div class="flex flex-col grow w-full">
          <label class="text-gray-500" for="pass-field">Password</label>
          <input
            class="border-b border-b-gray-400 px-1 py-2"
            type="password"
            v-model="password"
          />
        </div>

        <button
          @click="login"
          class="mt-4 w-full bg-blue-400 px-8 py-2 text-white rounded"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSocketStore } from '@/stores/socket.js';

const store = useSocketStore();
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
    if (auth) {
      store.login(auth);
      router.push({ path: '/', query: { user: username.value, auth: auth } });
    }
  }
  username.value = null;
  password.value = null;
};
</script>
