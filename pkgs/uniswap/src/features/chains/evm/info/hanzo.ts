import { Token } from '@luxamm/sdk-core'
import { GraphQLApi } from '@luxexchange/api'
import { HANZO_LOGO } from 'ui/src/assets'
import { CHAIN_ID_TO_URL_PARAM } from 'uniswap/src/features/chains/chainUrlParam'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { GENERIC_L2_GAS_CONFIG } from 'uniswap/src/features/chains/gasDefaults'
import { GqlChainId, NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { ONE_SECOND_MS } from 'utilities/src/time/time'

const LUSDC_HANZO = '0x51c3408B9A6a0B2446CCB78c72C846CEB76201FA'
const WHANZO = '0x0000000000000000000000000000000000000000' // wrapped native not yet deployed

const hanzoTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.Hanzo, LUSDC_HANZO, 6, 'LUSDC', 'Lux USD'),
  },
})

export const HANZO_CHAIN_INFO = {
  id: UniverseChainId.Hanzo,
  platform: Platform.EVM,
  testnet: false,
  name: 'Hanzo',
  assetRepoNetworkName: undefined,
  backendChain: {
    chain: GraphQLApi.Chain.Ethereum as GqlChainId,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: undefined,
  docs: 'https://docs.hanzo.ai/',
  elementName: ElementName.ChainHanzo,
  explorer: {
    name: 'Hanzo Explorer',
    url: 'https://explore-hanzo.lux.network/' as const,
  },
  interfaceName: 'hanzo',
  label: 'Hanzo',
  logo: HANZO_LOGO,
  nativeCurrency: {
    name: 'Hanzo',
    symbol: 'HANZO',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: HANZO_LOGO,
  },
  networkLayer: NetworkLayer.L2,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: false,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.Hanzo],
  rpcUrls: {
    [RPCType.Default]: { http: ['https://api.lux.network/mainnet/ext/bc/2GiQb73CeJESjc4omFv2YtQHZrRgJf25NXPzAr5J6UNHRcDV2F/rpc'] },
    [RPCType.Interface]: { http: ['https://api.lux.network/mainnet/ext/bc/2GiQb73CeJESjc4omFv2YtQHZrRgJf25NXPzAr5J6UNHRcDV2F/rpc'] },
  },
  tokens: hanzoTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped HANZO',
    symbol: 'WHANZO',
    decimals: 18,
    address: WHANZO,
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo
