import { defineStore } from 'pinia';
import { setToken, setRefToken, LogOut, getRefToken } from '@/config/env';
import { outLogin, getMenuAccess, login, loginCodeApp, refreshToken } from '@/servers/auth/auth';
// import { getApiAccess } from '@/servers/auth/system';

const getListCode = (list: API.System.MenuButtonItemProps[]) =>
  list.reduce((p: string[], { code, children }) => {
    if (children) p.push(...getListCode(children));
    return [code, ...p];
  }, []);

export const useUserStore = defineStore('userInfo', {
  state: (): { userInfo: API.CurrentUser | null; permission: string[] } => ({
    userInfo: null,
    permission: [],
  }),
  actions: {
    /** 用户登录 */
    async handleLogin(data: Partial<Record<string, string>>) {
      const { access_token, refresh_token } = await [login, loginCodeApp][data.username ? 0 : 1](data);
      setToken(access_token);
      setRefToken(refresh_token);
      return this.getUserInfo();
    },
    /** 获取用户信息 */
    async getUserInfo() {
      // 用户拓展信息, 数据量较大, 用不上争取不打开
      // const { data } = await getUserExtend();
      // this.userInfo = data;
      // setUserInfo(data);
      const result = await getMenuAccess();
      const list = result.data.filter(({ code }) => code.includes('app'));
      /** 接口权限历史遗留. 后期没有使用 */
      // const { data: apiRules } = await getApiAccess();
      // ...apiRules
      this.permission = getListCode(list || []).sort();
      // return data;
    },
    /** 刷新用户信息 */
    async refreshToken() {
      const refToken = getRefToken();
      if (!refToken) throw 401;
      const data = await refreshToken(refToken);
      this.userInfo = data;
      return data;
    },
    /**
     * 退出登录
     * @param isForce 是否上报
     */
    async handleLogout(isForce: boolean) {
      try {
        isForce || (await outLogin());
      } catch {}
      this.userInfo = null;
      LogOut();
      return;
    },
  },
  getters: {
    isLogin(): boolean {
      return Boolean(this.userInfo?.user_id);
    },
  },
});
