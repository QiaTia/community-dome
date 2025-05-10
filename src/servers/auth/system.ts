import Request from '../request/index';

const http = new Request('blade-system/');

/** 获取菜单权限 */
export const getMenuAccess = () => http.get<API.System.MenuButtonItemProps[]>(`menu/buttons`);

/** 获取接口权限 */
export const getApiAccess = () => http.get<string[]>(`menu/apiForButtons`);
