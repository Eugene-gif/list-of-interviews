import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('@/views/HomeView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeView,
    },
  ],
})

export default router
