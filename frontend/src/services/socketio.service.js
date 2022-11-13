import { io } from 'socket.io-client';

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

  listen() {
    if (this.socket) {
      this.socket.on('update', () => console.log('MEOWMEOWMO'));
    }
  }
}

export default new SocketioService();
