import { Loading, sleep } from '@/utils/utils';
import { App } from 'vue';
import { Icon, Overlay, List } from 'vant';
import { createPinia } from 'pinia';
import router from '@/router';
import { queryParse } from '@/servers/request/utils';
import { useUserStore } from '@/store/';
import { setRefToken, getRefToken, setToken } from '@/config/env';
// import update from './update';
import V3Waterfall from 'v3-waterfall';
import 'v3-waterfall/dist/style.css';

export default {
  install(app: App<Element>, _options = {}) {
    app.use(createPinia()).use(Icon).use(router).use(Overlay).use(List).use(V3Waterfall);
  },
};

(async function () {
  const currentPath = location.pathname;
  if (location.search) {
    const { refresh } = queryParse(location.search);
    Loading('自动登录中~');
    if (refresh) {
      setRefToken(refresh);
      // 把当前历史Token过期, 但是不能设置为空, 否则会判断没登录
      setToken('refresh', 0);
      await sleep();
      await useUserStore().getUserInfo();
      router.replace(currentPath);
    }
  } else {
    await sleep();
    const userStore = await useUserStore();
    if (getRefToken()) await userStore.getUserInfo();
    router.replace(currentPath);
  }
  const seatDom = document.querySelector('.chagee__seat');
  if (seatDom) document.body.removeChild(seatDom);
})();
