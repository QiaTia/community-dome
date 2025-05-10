/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** 后台正式地址 */
  readonly VITE_PROXY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
