import { px2vw } from '@/utils/utils';

export function rafThrottle(fn: Function) {
  let lock = false;
  return function (this: any, ...args: any[]) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      lock = false;
    });
  };
}

export function debounce(fn: Function, delay: number = 300) {
  let timer: number | null = null;
  return function (this: any, ...args: any[]) {
    timer && clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
/**
 * 计算字符串的显示长度
 * @param input - 输入的字符串或数字
 * @returns 计算后的显示长度
 */
function calculateDisplayLength(input: string | number): number {
  const str = String(input); // 确保输入为字符串
  let length = 0;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // 判断是否为英文数字（ASCII码0-9）
    if (code >= 48 && code <= 57) {
      length += 1;
    } else {
      length += 2; // 其他字符（中文、符号等）各占2位
    }
  }

  return length;
}
/** 计算高度 单位vw */
export function computedHeight(item: API.feed.ContentItem) {
  const coverInfo = (JSON.parse(item.content) as any[]).find((item) => ['img', 'video'].includes(item.blockType));
  const v = coverInfo.img ?? coverInfo.video ?? { width: 0, height: 0 };
  // if (v.width === 0 || v.height === 0) {
  //   console.log('coverInfo', coverInfo);
  // }
  const coverHeight = (v.height / v.width) * 50;
  const titleLen = calculateDisplayLength(item.title);
  const titleHeight = px2vw(titleLen > 44 ? 14 * 3.2 : 14 * 1.8);
  const descHeight = px2vw(12 * 1.4);
  const footerHeight = px2vw(12 * 1.8);
  return coverHeight + titleHeight + 8 + descHeight + footerHeight + 2;
}
