/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SOLANA_RPC_URL: string
  readonly VITE_MINT_ADDRESS: string
  readonly VITE_WALLET_PRIVATE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 