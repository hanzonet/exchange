/**
 * Unified brand configuration for white-label exchange deployments.
 * All branding is driven by NEXT_PUBLIC_BRAND_* env vars.
 * Defaults to Lux Exchange if no env vars are set.
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

// Runtime hostname detection for white-label deployments serving from the same build
const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

interface BrandPreset {
  name: string; title: string; description: string
  appDomain: string; docsDomain: string; infoDomain: string
  gatewayDomain: string; wsDomain: string
  twitter: string; github: string; discord: string
  primaryColor: string; defaultChainId: number
}

const BRAND_PRESETS: Record<string, BrandPreset> = {
  'zoo.exchange': {
    name: 'Zoo Exchange', title: 'Zoo Exchange | Trade',
    description: 'The decentralized exchange for the Zoo ecosystem',
    appDomain: 'zoo.exchange', docsDomain: 'docs.zoo.exchange',
    infoDomain: 'info.zoo.exchange', gatewayDomain: 'gateway.zoo.exchange',
    wsDomain: 'ws.zoo.exchange',
    twitter: 'https://x.com/zoo_ngo', github: 'https://github.com/zoo-labs',
    discord: 'https://discord.gg/zoo', primaryColor: '#00C853',
    defaultChainId: 200200,
  },
}

// Match hostname to preset (supports subdomains like app.zoo.exchange)
const matchedPreset = Object.entries(BRAND_PRESETS).find(
  ([domain]) => hostname === domain || hostname.endsWith(`.${domain}`)
)?.[1]

const brandEnv = (key: string, field: keyof BrandPreset | null, fallback: string): string =>
  env(key, '') || (field && matchedPreset ? String(matchedPreset[field]) : '') || fallback

export const brand: BrandConfig = {
  name: brandEnv('NEXT_PUBLIC_BRAND_NAME', 'name', 'Lux Exchange'),
  title: brandEnv('NEXT_PUBLIC_BRAND_TITLE', 'title', 'Lux Exchange | Trade'),
  description: brandEnv(
    'NEXT_PUBLIC_BRAND_DESCRIPTION', 'description',
    'Swap, earn, and build on the leading decentralized exchange',
  ),

  appDomain: brandEnv('NEXT_PUBLIC_APP_DOMAIN', 'appDomain', 'lux.exchange'),
  docsDomain: brandEnv('NEXT_PUBLIC_DOCS_DOMAIN', 'docsDomain', 'docs.lux.exchange'),
  infoDomain: brandEnv('NEXT_PUBLIC_INFO_DOMAIN', 'infoDomain', 'info.lux.exchange'),
  gatewayDomain: brandEnv('NEXT_PUBLIC_GATEWAY_DOMAIN', 'gatewayDomain', 'gateway.lux.exchange'),
  wsDomain: brandEnv('NEXT_PUBLIC_WS_DOMAIN', 'wsDomain', 'ws.lux.exchange'),

  helpUrl: env('NEXT_PUBLIC_HELP_URL', 'https://docs.lux.exchange/help'),
  termsUrl: env('NEXT_PUBLIC_TERMS_URL', 'https://lux.exchange/terms'),
  privacyUrl: env('NEXT_PUBLIC_PRIVACY_URL', 'https://lux.exchange/privacy'),
  downloadUrl: env('NEXT_PUBLIC_DOWNLOAD_URL', 'https://lux.exchange/wallet'),

  complianceEmail: env('NEXT_PUBLIC_COMPLIANCE_EMAIL', 'compliance@lux.exchange'),
  supportEmail: env('NEXT_PUBLIC_SUPPORT_EMAIL', 'hi@lux.exchange'),

  twitter: brandEnv('NEXT_PUBLIC_TWITTER', 'twitter', 'https://x.com/luxfi'),
  github: brandEnv('NEXT_PUBLIC_GITHUB', 'github', 'https://github.com/luxfi'),
  discord: brandEnv('NEXT_PUBLIC_DISCORD', 'discord', 'https://discord.gg/lux'),

  logoUrl: env('NEXT_PUBLIC_LOGO_URL', ''),
  faviconUrl: env('NEXT_PUBLIC_FAVICON_URL', '/favicon.ico'),
  primaryColor: brandEnv('NEXT_PUBLIC_PRIMARY_COLOR', 'primaryColor', '#FC72FF'),

  defaultChainId: parseInt(brandEnv('NEXT_PUBLIC_DEFAULT_CHAIN_ID', 'defaultChainId' as any, '96369'), 10),
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
