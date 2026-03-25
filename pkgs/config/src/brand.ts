/**
 * Unified brand configuration for white-label exchange deployments.
 * 100% env-driven — no hardcoded brands. Set via KMS → K8s Secret → env vars.
 * Generic defaults work out of box; customize per deployment.
 */
export interface BrandConfig {
  // Identity
  name: string
  title: string
  description: string

  // Domains
  appDomain: string
  docsDomain: string
  infoDomain: string
  gatewayDomain: string
  wsDomain: string

  // URLs
  helpUrl: string
  termsUrl: string
  privacyUrl: string
  downloadUrl: string

  // Contact
  complianceEmail: string
  supportEmail: string

  // Social
  twitter: string
  github: string
  discord: string

  // Assets
  logoUrl: string
  faviconUrl: string
  primaryColor: string

  // Chain
  defaultChainId: number
  supportedChainIds: number[]

  // WalletConnect
  walletConnectProjectId: string

  // Analytics
  insightsHost: string
  insightsApiKey: string
}

const env = (key: string, fallback: string): string =>
  (typeof process !== 'undefined' ? process.env?.[key] : undefined) ?? fallback

export const brand: BrandConfig = {
  name: env('NEXT_PUBLIC_BRAND_NAME', 'Exchange'),
  title: env('NEXT_PUBLIC_BRAND_TITLE', 'Exchange | Trade'),
  description: env('NEXT_PUBLIC_BRAND_DESCRIPTION', 'Swap, earn, and build on the leading decentralized exchange'),

  appDomain: env('NEXT_PUBLIC_APP_DOMAIN', 'lux.exchange'),
  docsDomain: env('NEXT_PUBLIC_DOCS_DOMAIN', 'docs.lux.exchange'),
  infoDomain: env('NEXT_PUBLIC_INFO_DOMAIN', 'info.lux.exchange'),
  gatewayDomain: env('NEXT_PUBLIC_GATEWAY_DOMAIN', 'gateway.lux.exchange'),
  wsDomain: env('NEXT_PUBLIC_WS_DOMAIN', 'ws.lux.exchange'),

  helpUrl: env('NEXT_PUBLIC_HELP_URL', 'https://docs.lux.exchange/help'),
  termsUrl: env('NEXT_PUBLIC_TERMS_URL', 'https://lux.exchange/terms'),
  privacyUrl: env('NEXT_PUBLIC_PRIVACY_URL', 'https://lux.exchange/privacy'),
  downloadUrl: env('NEXT_PUBLIC_DOWNLOAD_URL', 'https://lux.exchange/wallet'),

  complianceEmail: env('NEXT_PUBLIC_COMPLIANCE_EMAIL', 'compliance@lux.exchange'),
  supportEmail: env('NEXT_PUBLIC_SUPPORT_EMAIL', 'hi@lux.exchange'),

  twitter: env('NEXT_PUBLIC_TWITTER', 'https://x.com/luxfi'),
  github: env('NEXT_PUBLIC_GITHUB', 'https://github.com/luxfi'),
  discord: env('NEXT_PUBLIC_DISCORD', 'https://discord.gg/lux'),

  logoUrl: env('NEXT_PUBLIC_LOGO_URL', ''),
  faviconUrl: env('NEXT_PUBLIC_FAVICON_URL', '/favicon.ico'),
  primaryColor: env('NEXT_PUBLIC_PRIMARY_COLOR', '#FC72FF'),

  defaultChainId: parseInt(env('NEXT_PUBLIC_DEFAULT_CHAIN_ID', '96369'), 10),
  supportedChainIds: env('NEXT_PUBLIC_SUPPORTED_CHAIN_IDS', '')
    .split(',')
    .filter(Boolean)
    .map(Number),

  walletConnectProjectId: env('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID', ''),

  insightsHost: env('NEXT_PUBLIC_INSIGHTS_HOST', 'https://insights.hanzo.ai'),
  insightsApiKey: env('NEXT_PUBLIC_INSIGHTS_API_KEY', ''),
}

export function getBrandUrl(path: string): string {
  return `https://${brand.appDomain}${path}`
}

export function getDocsUrl(path: string): string {
  return `https://${brand.docsDomain}${path}`
}

export function getGatewayUrl(path: string): string {
  return `https://${brand.gatewayDomain}${path}`
}

export function getWsUrl(path: string): string {
  return `wss://${brand.wsDomain}${path}`
}
