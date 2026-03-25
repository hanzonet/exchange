import { type BlockaidApiClient as BlockaidApiClientType, createBlockaidApiClient } from '@luxexchange/api'
import { config } from 'uniswap/src/config'
import { createUniswapFetchClient } from 'uniswap/src/data/apiClients/createUniswapFetchClient'

const BlockaidFetchClient = createUniswapFetchClient({
  baseUrl: `${config.blockaidProxyUrl}`,
  additionalHeaders: {
    'x-api-key': config.tradingApiKey,
  },
})

export const BlockaidApiClient: BlockaidApiClientType = createBlockaidApiClient({
  fetchClient: BlockaidFetchClient,
})
