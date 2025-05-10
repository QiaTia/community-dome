/**
 * URI数据转换
 * @param params
 */
export function stringify(params: Record<string, any>) {
  return Object.keys(params)
    .filter((t) => params[t] != undefined)
    .map((i) => `${i}=${params[i]}`)
    .join('&');
}
/**
 * URI数据整理
 */
export function queryParse(params: string) {
  const data: Record<string, string> = {};
  params
    .replace(/^\?/, '')
    .split('&')
    .forEach((item) => {
      const [key, value = ''] = item.split('=');
      if (key) data[key] = value;
    });
  return data;
}
/* 判断url是否为绝对路径 */
export const posUrl = (url = '') => /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
