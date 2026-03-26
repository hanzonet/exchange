import { createJupiterApiClient, JupiterApiClient as JupiterApiClientType } from '@luxexchange/api'
import { config } from 'uniswap/src/config'
import { createLxFetchClient } from 'uniswap/src/data/apiClients/createLxFetchClient'

const JupiterFetchClient = createLxFetchClient({
  baseUrl: `${config.jupiterProxyUrl}/ultra/v1`,
  additionalHeaders: {
    'x-api-key': config.tradingApiKey,
  },
})

export const JupiterApiClient: JupiterApiClientType = createJupiterApiClient({
  fetchClient: JupiterFetchClient,
})
