import { createRouter, createWebHistory } from 'vue-router';
import Map from '../views/map.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/map',
      name: 'map',
      component: Map,
      props: (route) => ({ user: route.query.user, auth: route.query.auth }),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});

export default router;
