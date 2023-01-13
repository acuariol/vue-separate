interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_NAME: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_VERSION__: string

