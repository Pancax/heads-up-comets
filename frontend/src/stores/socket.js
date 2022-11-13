import { ref } from 'vue';
import { defineStore } from 'pinia';
import SocketioService from '../services/socketio.service';

export const useSocketStore = defineStore('socket', () => {
  const socket = SocketioService;

  function setup() {
    socket.setupSocketConnection();
  }

  function disconnect() {
    socket.disconnect();
  }

  function login(auth) {
    socket.login(auth);
  }

  return { socket, setup, disconnect, login };
});
