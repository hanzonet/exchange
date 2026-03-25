import { Token } from '@luxamm/sdk-core'
import { GraphQLApi } from '@luxexchange/api'
import { LUX_LOGO, LUX_NETWORK_LOGO } from 'ui/src/assets'
import { CHAIN_ID_TO_URL_PARAM } from 'uniswap/src/features/chains/chainUrlParam'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { GENERIC_L2_GAS_CONFIG } from 'uniswap/src/features/chains/gasDefaults'
import { GqlChainId, NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { ONE_SECOND_MS } from 'utilities/src/time/time'

const LUSDC_MAINNET = '0x57f9E717dc080a6A76fB6F77BecA8C9C1D266B96'
const WLUX_MAINNET = '0x4888e4a2ee0f03051c72d2bd3acf755ed3498b3e'

const luxTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.Lux, LUSDC_MAINNET, 6, 'LUSDC', 'Lux USD'),
  },
})

export const LUX_CHAIN_INFO = {
  id: UniverseChainId.Lux,
  platform: Platform.EVM,
  testnet: false,
  name: 'Lux',
  assetRepoNetworkName: undefined,
  backendChain: {
    chain: GraphQLApi.Chain.Ethereum as GqlChainId,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: 'https://bridge.lux.network',
  docs: 'https://docs.lux.network/',
  elementName: ElementName.ChainLux,
  explorer: {
    name: 'Lux Explorer',
    url: 'https://explore.lux.network/' as const,
  },
  interfaceName: 'lux',
  label: 'Lux',
  logo: LUX_NETWORK_LOGO,
  nativeCurrency: {
    name: 'Lux',
    symbol: 'LUX',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: LUX_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: true,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.Lux],
  rpcUrls: {
    [RPCType.Default]: { http: ['https://api.lux.network/ext/bc/C/rpc'] },
    [RPCType.Interface]: { http: ['https://api.lux.network/ext/bc/C/rpc'] },
  },
  tokens: luxTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped LUX',
    symbol: 'WLUX',
    decimals: 18,
    address: WLUX_MAINNET,
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo

// -- Testnet --

const LUSDC_TESTNET = '0x8a3fad1c7FB94461621351aa6A983B6f814F039c'
const WLUX_TESTNET = '0xDe5310d0Eccc04C8987cB66Ff6b89Ee793442C91'

const luxTestnetTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.LuxTestnet, LUSDC_TESTNET, 6, 'LUSDC', 'Lux USDC'),
  },
})

export const LUX_TESTNET_CHAIN_INFO = {
  id: UniverseChainId.LuxTestnet,
  platform: Platform.EVM,
  testnet: true,
  name: 'Lux Testnet',
  assetRepoNetworkName: undefined,
  backendChain: {
    chain: GraphQLApi.Chain.Ethereum as GqlChainId,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: undefined,
  docs: 'https://docs.lux.network/',
  elementName: ElementName.ChainLuxTestnet,
  explorer: {
    name: 'Lux Testnet Explorer',
    url: 'https://explore.lux-test.network/' as const,
  },
  interfaceName: 'lux_testnet',
  label: 'Lux Testnet',
  logo: LUX_NETWORK_LOGO,
  nativeCurrency: {
    name: 'Lux',
    symbol: 'LUX',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: LUX_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: true,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.LuxTestnet],
  rpcUrls: {
    [RPCType.Default]: { http: ['https://api.lux-test.network/ext/bc/C/rpc'] },
    [RPCType.Interface]: { http: ['https://api.lux-test.network/ext/bc/C/rpc'] },
  },
  tokens: luxTestnetTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped LUX',
    symbol: 'WLUX',
    decimals: 18,
    address: WLUX_TESTNET,
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo

// -- Devnet (lux dev start, single-node K=1, chainId 1337) --

const WLUX_DEV = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const luxDevTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.LuxDev, '0x0000000000000000000000000000000000000000', 6, 'LUSDC', 'Lux USDC'),
  },
})

export const LUX_DEV_CHAIN_INFO = {
  id: UniverseChainId.LuxDev,
  platform: Platform.EVM,
  testnet: true,
  name: 'Lux Dev',
  assetRepoNetworkName: undefined,
  backendChain: {
    chain: GraphQLApi.Chain.Ethereum as GqlChainId,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: undefined,
  docs: 'https://docs.lux.network/',
  elementName: ElementName.ChainLuxDev,
  explorer: {
    name: 'Lux Dev Explorer',
    url: 'http://localhost:8547/' as const,
  },
  interfaceName: 'lux_dev',
  label: 'Lux Dev',
  logo: LUX_NETWORK_LOGO,
  nativeCurrency: {
    name: 'Lux',
    symbol: 'LUX',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: LUX_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: true,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.LuxDev],
  rpcUrls: {
    [RPCType.Default]: { http: ['http://127.0.0.1:8545/ext/bc/C/rpc'] },
    [RPCType.Interface]: { http: ['http://127.0.0.1:8545/ext/bc/C/rpc'] },
  },
  tokens: luxDevTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped LUX',
    symbol: 'WLUX',
    decimals: 18,
    address: WLUX_DEV,
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo
