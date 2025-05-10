import Request, { stringify } from '../request/';
import { tenantId } from '@/config/';

export { getMenuAccess } from './system';

const http = new Request(`blade-auth/`);

/** 退出登录接口 POST /api/login/outLogin */
export const outLogin = () => http.get('oauth/logout');
/** 刷新用户Token */
export const refreshToken = (refresh_token: string) =>
  http.request<unknown, API.CurrentUser>({
    url: `oauth/token?${stringify({
      tenantId,
      refresh_token,
      grant_type: 'refresh_token',
      scope: 'all',
    })}`,
    data: {},
    method: 'POST',
    headers: {
      'Tenant-Id': tenantId,
      IsRefToken: 'true',
    },
  });

/** 用户登录 */
export const login = ({ username, code, key }: Partial<Record<string, string>>) => {
  const headers: Record<string, string> = {
    'Tenant-Id': tenantId,
    'Dept-Id': '',
    'Role-Id': '',
  };
  if (code && key) {
    headers['Captcha-Code'] = code;
    headers['Captcha-Key'] = key;
  }
  return http.request<unknown, API.CurrentUser>({
    url: `oauth/token?${stringify({
      username,
      // password: Md5(password as string),
      tenantId,
      grant_type: code ? 'captcha' : 'password',
      scope: 'all',
      type: code ? 'account' : undefined,
    })}`,
    method: 'POST',
    headers,
  });
};
/** 验证码登录 */
export const loginCodeApp = ({ phone, id, value }: Partial<Record<string, string>>) =>
  http.request<unknown, { [key in 'access_token' | 'refresh_token']: string }>({
    url: `oauth/token?${stringify({
      phone,
      id,
      value,
      tenantId,
      grant_type: 'captcha_phone',
      scope: 'all',
      type: 'account',
    })}`,
    method: 'POST',
    headers: {
      'Tenant-Id': tenantId,
      'Dept-Id': '',
      'Role-Id': '',
    },
  });
