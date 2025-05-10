import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store';
import routes from './routes';
/** 不做登录拦截域名前缀 */
// const NoIntercept = ['/navigate', '/share'];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, _, next) => {
  if (to.path.includes('/home') || to.path.includes('/game')) {
    next();
    return;
  }
  const userStore = useUserStore();
  // 将页面滚动到页面顶部
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  /** 已经登录去登录页面 */
  const isToLogin = to.path.includes('login');
  if (isToLogin && userStore.isLogin) return next('/');
  /** 不去登录页面但是未登录 */
  if (!isToLogin && !userStore.isLogin) {
    return next('/login');
  }
  next();
});

export default router;
