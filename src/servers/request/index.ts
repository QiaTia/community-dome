import { baseURL } from '@/config';
import refToken from './refToken';
import { Modal, Throttle, Toast } from '@/utils/utils';
import axios from 'axios';
import { getToken, LogOut } from '@/config/env';
import { posUrl } from './utils';
export { stringify } from './utils';
import LoadStatus from './LoadStatus';

export default class http extends axios.Axios {
  private static throttle = Throttle();
  private static refToken = new refToken();
  constructor(prefix = '', otherApi = false) {
    super({
      baseURL: otherApi ? prefix : posUrl(prefix) ? prefix : `${baseURL}${prefix}`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YXBwOmFwcF9zZWNyZXQ=',
      },
      timeout: 3e5, // 五分钟
    });
    /** 请求数据进行拦截 */
    this.interceptors.request.use(async (config) => {
      if (getToken().token && !config.headers.IsRefToken) {
        try {
          const token = await http.refToken.getToken();
          config.headers['blade-auth'] = `bearer ${token}`;
        } catch {
          console.warn('RefTokenFail');
          http.throttle(async () => {
            LogOut();
            await Modal('登录已过期, 请重新登录!', '', false);
            window.location.reload();
          });
        }
      }
      if (typeof config.data != 'object' || !config.data['hideLoading']) {
        let showMask = false;
        // 取消蒙版显示
        if (config.data?.['showMask']) {
          showMask = true;
          delete config.data['showMask'];
        }
        LoadStatus.push(config.url!, showMask);
        // @ts-ignore
        config.custom = { loadStatus: true };
      } else {
        if (typeof config.data == 'object') delete config.data['hideLoading'];
        // @ts-ignore
        config.custom = { hideLoading: true };
      }
      if (typeof config.data == 'object') {
        config.data = JSON.stringify(config.data);
      }
      return config;
    });
    /** 收到消息进行拦截 */
    this.interceptors.response.use(
      ({ config, data, headers }) => {
        if (typeof data == 'string' && JSON.stringify(headers).includes('application/json')) {
          try {
            data = JSON.parse(data);
          } catch {}
        }
        // @ts-ignore
        if (!config?.custom?.hideLoading) {
          LoadStatus.delete();
        }
        if ((data.error && data.error_description) || (data.code && data.code != 200 && data.msg)) {
          if (data.code == 401) {
            http.throttle(async () => {
              LogOut();
              await Modal('登录已过期, 请重新登录!', '', false);
            });
            return;
          }
          if (data.code == 1000 && (data.error_description || data.msg)) Modal(data.error_description || data.msg || '', void 0, false);
          else setTimeout(() => Toast(data.error_description || data.msg || ''), 2e2);
          return Promise.reject(data);
        }
        return data;
      },
      (err) => {
        if (!err.config?.custom?.hideLoading) {
          LoadStatus.delete();
        }
        if (typeof err.data == 'object' && ((err.data.error && err.data.error_description) || (err.data.code != 200 && err.data.msg))) {
          if (err.data.error_description == '账户已停用! ') return Modal(err.data.error_description, '提示', false).then(() => Promise.reject());
          else if (err.data.code == 1000 && (err.data.error_description || err.data.msg)) Modal(err.data.error_description || err.data.msg || '', void 0, false);
          else if (err.data.code == 401)
            http.throttle(async () => {
              LogOut();
              await Modal('登录已过期, 请重新登录!', '', false);
              window.location.replace('/login');
            });
          else setTimeout(() => Toast(err.data.error_description || err.data.msg || ''), 2e2);
        }
        return Promise.reject(err);
      },
    );
  }
}
