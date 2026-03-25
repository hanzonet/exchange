import { Token } from '@luxamm/sdk-core'
import { GraphQLApi } from '@luxexchange/api'
import { PARS_LOGO } from 'ui/src/assets'
import { CHAIN_ID_TO_URL_PARAM } from 'uniswap/src/features/chains/chainUrlParam'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { GENERIC_L2_GAS_CONFIG } from 'uniswap/src/features/chains/gasDefaults'
import { GqlChainId, NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { ONE_SECOND_MS } from 'utilities/src/time/time'

const LUSDC_PARS = '0xC5e4A6f54Be469551a342872C1aB83AB46f61b22'
const WPARS = '0x0000000000000000000000000000000000000000' // wrapped native not yet deployed

const parsTokens = buildChainTokens({
  stables: {
    USDC: new Token(UniverseChainId.Pars, LUSDC_PARS, 6, 'LUSDC', 'Lux USD'),
  },
})

export const PARS_CHAIN_INFO = {
  id: UniverseChainId.Pars,
  platform: Platform.EVM,
  testnet: false,
  name: 'Pars',
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
  elementName: ElementName.ChainPars,
  explorer: {
    name: 'Pars Explorer',
    url: 'https://explore-pars.lux.network/' as const,
  },
  interfaceName: 'pars',
  label: 'Pars',
  logo: PARS_LOGO,
  nativeCurrency: {
    name: 'PARS',
    symbol: 'PARS',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: PARS_LOGO,
  },
  networkLayer: NetworkLayer.L2,
  blockTimeMs: 2000,
  pendingTransactionsRetryOptions: undefined,
  statusPage: undefined,
  supportsV4: false,
  supportsNFTs: false,
  urlParam: CHAIN_ID_TO_URL_PARAM[UniverseChainId.Pars],
  rpcUrls: {
    [RPCType.Default]: { http: ['https://api.lux.network/mainnet/ext/bc/2pUskxqaL5Bpx7uRUGG1fDjPckjxQ4UKX4sLKeaS1NdSVBJd3F/rpc'] },
    [RPCType.Interface]: { http: ['https://api.lux.network/mainnet/ext/bc/2pUskxqaL5Bpx7uRUGG1fDjPckjxQ4UKX4sLKeaS1NdSVBJd3F/rpc'] },
  },
  tokens: parsTokens,
  wrappedNativeCurrency: {
    name: 'Wrapped PARS',
    symbol: 'WPARS',
    decimals: 18,
    address: WPARS,
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: ONE_SECOND_MS,
} as const satisfies UniverseChainInfo
