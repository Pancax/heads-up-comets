import { io } from 'socket.io-client';
// import { useEventStore } from '@/stores/';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:3000/');
  }

  login(auth) {
    if (this.socket) {
      this.socket.emit('login', auth);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
