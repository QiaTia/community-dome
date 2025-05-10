const ACCESSTOKEN = 'CHAGEE_TOKEN';
const REFTOKEN = 'CHAGEE_REF_TOKEN';
const USERINFO = 'CHAGEE_USER_INFO';

/** Token过期时间, 一般后台配置 */
const EXPTIME = 36e5;

/** 得到token */
export const getToken = (): {
  exp: number;
  token?: string;
} => getStorageSync(ACCESSTOKEN) || { exp: 0 };
/** 保存token */
export const setToken = (token: string, exp = Date.now() + EXPTIME - 1e4) => setStorageSync(ACCESSTOKEN, { token, exp });

/** 得到RefToken */
export const getRefToken = () => getStorageSync<string>(REFTOKEN);
/** 保存RefToken */
export const setRefToken = (token: string) => setStorageSync(REFTOKEN, token);

/**
 * 读取本地已保存数据
 * @param key 键值
 */
function getStorageSync<T>(key: string): T | null {
  return JSON.parse(window.localStorage.getItem(key) || 'null');
}
/**
 * 保存数据到缓存
 * @param key 键值
 * @param data 数据
 */
function setStorageSync(key: string, data: any) {
  return window.localStorage.setItem(key, JSON.stringify(data));
}
/**
 * 移除本地缓存数据
 * @param key 键值
 */
export function removeStorageSync(key: string) {
  return window.localStorage.removeItem(key);
}
/**退出登录 */
export function LogOut() {
  // window.location.replace('/');
  removeStorageSync(REFTOKEN);
  removeStorageSync(USERINFO);
  window.sessionStorage.clear();
}

/**
 * 读取本地已保存数据
 * @param key 键值
 */
export const getSessionItem = <T = unknown>(key: string): T | null => JSON.parse(window.sessionStorage.getItem(key) || 'null');

/**
 * 保存数据到缓存
 * @param key 键值
 * @param data 数据
 */
export const setSessionItem = (key: string, item: unknown) => window.sessionStorage.setItem(key, JSON.stringify(item));
