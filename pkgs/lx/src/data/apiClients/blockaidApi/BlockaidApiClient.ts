import { type BlockaidApiClient as BlockaidApiClientType, createBlockaidApiClient } from '@luxfi/api'
import { config } from '@luxexchange/lx/src/config'
import { createLuxFetchClient } from '@luxexchange/lx/src/data/apiClients/createLuxFetchClient'

const BlockaidFetchClient = createLuxFetchClient({
  baseUrl: `${config.blockaidProxyUrl}`,
  additionalHeaders: {
    'x-api-key': config.tradingApiKey,
  },
})

export const BlockaidApiClient: BlockaidApiClientType = createBlockaidApiClient({
  fetchClient: BlockaidFetchClient,
})
