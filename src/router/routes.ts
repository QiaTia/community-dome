import type { RouteRecordRaw } from 'vue-router';
// import WhiteLayout from '@/App.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/App.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/home.vue'),
      },
      {
        path: '/game',
        component: () => import('@/views/home/home.vue'),
      },
    ],
  },
];

export default routes;
