import { Token } from '@luxamm/sdk-core'
import { GraphQLApi } from '@luxexchange/api'
import { SPC_LOGO } from 'ui/src/assets'
import { CHAIN_ID_TO_URL_PARAM } from 'uniswap/src/features/chains/chainUrlParam'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { GENERIC_L2_GAS_CONFIG } from 'uniswap/src/features/chains/gasDefaults'
import { GqlChainId, NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { ONE_SECOND_MS } from 'utilities/src/time/time'

const WSPC = '0x0000000000000000000000000000000000000000' // wrapped native not yet deployed

const spcTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.SPC, '0x0000000000000000000000000000000000000000', 6, 'LUSDC', 'Lux USD'),
  },
})

export const SPC_CHAIN_INFO = {
  id: UniverseChainId.SPC,
  platform: Platform.EVM,
  testnet: false,
  name: 'SPC',
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
  elementName: ElementName.ChainSPC,
  explorer: {
    name: 'SPC Explorer',
    url: 'https://explore-spc.lux.network/' as const,
  },
  interfaceName: 'spc',
  label: 'SPC',
  logo: SPC_LOGO,
  nativeCurrency: {
    name: 'SPC',
    symbol: 'SPC',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: SPC_LOGO,
  },
  networkLayer: NetworkLayer.L2,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: false,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.SPC],
  rpcUrls: {
    [RPCType.Default]: { http: ['https://api.lux.network/mainnet/ext/bc/rtjwvtE1tEvrokmpeYdTq7b2zqZgmybKwR5MLjKMGAR1W78dQ/rpc'] },
    [RPCType.Interface]: { http: ['https://api.lux.network/mainnet/ext/bc/rtjwvtE1tEvrokmpeYdTq7b2zqZgmybKwR5MLjKMGAR1W78dQ/rpc'] },
  },
  tokens: spcTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped SPC',
    symbol: 'WSPC',
    decimals: 18,
    address: WSPC,
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo
