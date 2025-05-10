const NODE_ENV = import.meta.env.MODE;

/** 导出默认域名 */
export const baseURL = NODE_ENV == 'development' ? 'https://api.qiatia.cn' : 'https://api.qiatia.cn';

/** TenantId */
export const tenantId = '000000';

console.log('当前域名:', baseURL);
