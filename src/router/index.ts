import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/PageHome.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/PageAuth.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/interview/:id',
    name: 'Interview',
    component: () => import('@/views/PageInterview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/PageList.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/PageStatistic.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/Page404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const isLogin = !!userStore.userId;
  const requiresAuth = to.meta.requiresAuth;

  // Проверяем, что мы уже НЕ идем на страницу Auth, чтобы избежать бесконечного цикла
  if (requiresAuth && !isLogin && to.name !== 'Auth') return { name: 'Auth' };
  // Если мы авторизованы и стучимся на Auth то отправляем на Home
  if (!requiresAuth && isLogin && to.name === 'Auth') return { name: 'Home' };
})

export default router;
