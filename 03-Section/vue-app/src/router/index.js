import { createRouter, createWebHistory } from 'vue-router';
import TheBody from '../components/TheBody.vue';
import TheLogin from '../components/TheLogin.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheBody,
  },
  {
    path: '/login',
    name: 'Login',
    component: TheLogin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
