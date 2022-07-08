import { createRouter, createWebHistory } from 'vue-router';
import TheBody from '../components/TheBody.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheBody,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
