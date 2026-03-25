import { Token } from '@luxamm/sdk-core'
import { GraphQLApi } from '@luxexchange/api'
import { ZOO_LOGO } from 'ui/src/assets'
import { CHAIN_ID_TO_URL_PARAM } from 'uniswap/src/features/chains/chainUrlParam'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { GENERIC_L2_GAS_CONFIG } from 'uniswap/src/features/chains/gasDefaults'
import { GqlChainId, NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { ONE_SECOND_MS } from 'utilities/src/time/time'

const ZUSD_ADDRESS = '0x848Cff46eb323f323b6Bbe1Df274E40793d7f2c2'
const WZOO_MAINNET = '0x4888E4a2Ee0F03051c72D2BD3ACf755eD3498B3E'

const zooTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.Zoo, ZUSD_ADDRESS, 18, 'ZUSD', 'Zoo Dollar'),
  },
})

export const ZOO_CHAIN_INFO = {
  id: UniverseChainId.Zoo,
  platform: Platform.EVM,
  testnet: false,
  name: 'Zoo',
  assetRepoNetworkName: undefined,
  backendChain: {
    chain: GraphQLApi.Chain.Ethereum as GqlChainId,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: 'https://bridge.zoo.network',
  docs: 'https://docs.zoo.network/',
  elementName: ElementName.ChainZoo,
  explorer: {
    name: 'Zoo Explorer',
    url: 'https://explore.zoo.network/' as const,
  },
  interfaceName: 'zoo',
  label: 'Zoo',
  logo: ZOO_LOGO,
  nativeCurrency: {
    name: 'Zoo',
    symbol: 'ZOO',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: ZOO_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: true,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.Zoo],
  rpcUrls: {
    [RPCType.Default]: { http: ['https://api.zoo.network/ext/bc/C/rpc'] },
    [RPCType.Interface]: { http: ['https://api.zoo.network/ext/bc/C/rpc'] },
  },
  tokens: zooTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped ZOO',
    symbol: 'WZOO',
    decimals: 18,
    address: WZOO_MAINNET,
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo

// -- Testnet --

const zooTestnetTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.ZooTestnet, '0x0000000000000000000000000000000000000000', 18, 'ZUSD', 'Zoo Dollar'),
  },
})

export const ZOO_TESTNET_CHAIN_INFO = {
  id: UniverseChainId.ZooTestnet,
  platform: Platform.EVM,
  testnet: true,
  name: 'Zoo Testnet',
  assetRepoNetworkName: undefined,
  backendChain: {
    chain: GraphQLApi.Chain.Ethereum as GqlChainId,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: undefined,
  docs: 'https://docs.zoo.network/',
  elementName: ElementName.ChainZooTestnet,
  explorer: {
    name: 'Zoo Testnet Explorer',
    url: 'https://explore.zoo-test.network/' as const,
  },
  interfaceName: 'zoo_testnet',
  label: 'Zoo Testnet',
  logo: ZOO_LOGO,
  nativeCurrency: {
    name: 'Zoo',
    symbol: 'ZOO',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: ZOO_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: true,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.ZooTestnet],
  rpcUrls: {
    [RPCType.Default]: { http: ['https://api.zoo-test.network/ext/bc/C/rpc'] },
    [RPCType.Interface]: { http: ['https://api.zoo-test.network/ext/bc/C/rpc'] },
  },
  tokens: zooTestnetTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped ZOO',
    symbol: 'WZOO',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000',
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo
