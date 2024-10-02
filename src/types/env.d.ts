/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_API_BASE_URL: string
  readonly GENERATE_API_SCHEMA_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
