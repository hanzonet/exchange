import { createJupiterApiClient, JupiterApiClient as JupiterApiClientType } from '@luxexchange/api'
import { config } from 'uniswap/src/config'
import { createLuxFetchClient } from 'uniswap/src/data/apiClients/createLuxFetchClient'

const JupiterFetchClient = createLuxFetchClient({
  baseUrl: `${config.jupiterProxyUrl}/ultra/v1`,
  additionalHeaders: {
    'x-api-key': config.tradingApiKey,
  },
})

export const JupiterApiClient: JupiterApiClientType = createJupiterApiClient({
  fetchClient: JupiterFetchClient,
})
