import { showToast, showDialog } from 'vant';

// const PRIMARYCOLOR = '#00A689';
/**
 * !-- 使用全局方法先引入样式 --!
 *
 */
// Toast
import 'vant/es/toast/style';
// Dialog
import 'vant/es/dialog/style';
// Notify
// import 'vant/es/notify/style';
// ImagePreview
import 'vant/es/image-preview/style';

type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'html';
export type ToastPosition = 'top' | 'middle' | 'bottom';
type ToastMessage = string | number;
interface ShowToastOptions {
  color?: string;
  mask?: boolean;
  icon?: string;
  message?: ToastMessage;
  duration?: number;
  background?: string;
  iconSize?: ToastMessage;
  position?: ToastPosition;
}
type TostType = 'none' | 'load' | 'success' | 'error' | 'warn';
/** Toast提示 */
export const Toast = function (b1: string | (ShowToastOptions & { type?: TostType }), duration = 3e3) {
  let params: ShowToastOptions & { type?: ToastType };
  let type: TostType = 'none';
  if (typeof b1 === 'object') {
    const { type: _, ...opt } = b1;
    if (_) type = _;
    params = {
      duration,
      ...opt,
    };
  } else if (typeof b1 === 'string')
    params = {
      duration,
      message: b1,
    };
  else throw new Error('Toast params is object or string!');

  switch (typeof b1 == 'object' ? type : '') {
    case 'error':
      params.type = 'fail';
      break;
    case 'warn':
      params.type = 'fail';
      break;
    case 'success':
      params.type = 'success';
      break;
    case 'load':
      params.duration = 6e4;
      break;
  }
  params.position = 'bottom';
  return showToast(params);
};

type ModalProps = {
  title: string;
  showCancel: boolean;
  cancelText: string;
  cancelColor: string;
  confirmText: string;
  confirmColor: string;
  content: string;
};
/** 模态确认 */
export const Modal = function (b1: Partial<ModalProps> | string, b2 = '提示', showCancel = true) {
  let params: Partial<ModalProps> = {
    title: b2,
    showCancel,
    cancelText: '取消',
    cancelColor: '#666',
    confirmText: '确定',
    content: '',
  };
  if (typeof b1 === 'object')
    params = {
      ...params,
      ...b1,
    };
  else if (typeof b1 === 'string')
    params = {
      ...params,
      content: b1,
    };
  else throw new Error('Modal params is object or string!');
  return showDialog({
    title: params.title,
    message: params.content,
    cancelButtonColor: params.cancelColor,
    cancelButtonText: params.cancelText,
    showCancelButton: params.showCancel,
    confirmButtonText: params.confirmText,
    confirmButtonColor: params.confirmColor,
  });
};
/** 去重的模态确认 */
export const ThrottleModal = (function () {
  /** 是否弹窗在展示 */
  let isShow = false;
  return function (b1: Partial<ModalProps> | string, b2 = '提示', showCancel = true) {
    if (isShow) return Promise.reject('请关闭当前弹窗');
    return new Promise(async (resolve, reject) => {
      isShow = true;
      try {
        const reslut = await Modal(b1, b2, showCancel);
        resolve(reslut);
      } catch (e) {
        reject(e);
      }
      isShow = false;
    });
  };
})();

/** 坐标求距离 */
const toRad = (d: number) => (d * Math.PI) / 180;
export const getDisance = ([lng1, lat1]: number[], [lng2, lat2]: number[]) => {
  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);
  const deltaLat = radLat1 - radLat2;
  const deltaLng = toRad(lng1) - toRad(lng2);
  const dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return dis * 6378137;
};

export function Loading(title = '加载中~', forbidClick = false, duration = 6e4) {
  if (duration == 0) duration = 9e8;
  return showToast({ type: 'loading', message: title, duration, forbidClick });
}

/** 函数节流 */
export const Throttle = function () {
  let t = 0;
  return function (cd: () => any, time = 500) {
    if (t) return time > 500 && Toast('请勿频繁操作!');
    cd();
    t = window.setTimeout(() => (t = 0), time);
  };
};

/** 函数防抖 */
export const Debounce = function (time = 50) {
  let t = 0;
  return function (cd: () => any) {
    if (t) clearTimeout(t);
    t = window.setTimeout(() => cd(), time);
  };
};

/** 设置标题 */
export const setTitle = (tex: string) => (document.title = tex);

export const sleep = (delay = 100) => new Promise((cb) => setTimeout(cb, delay));

/** 动态单位换算 */
export const px2vw = (w: number) => (w / 375) * 100;
