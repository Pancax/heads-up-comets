import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/index.vue';
import Login from '../views/login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: (route) => ({ user: route.query.user, auth: route.query.auth }),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

export default router;
