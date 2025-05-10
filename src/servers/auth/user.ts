import Request from '../request/';

const http = new Request(`blade-auth/`);

/** 个人信息查询 */
export const getUserExtend = () => http.get<API.User.ExtendInfo>('extend');
