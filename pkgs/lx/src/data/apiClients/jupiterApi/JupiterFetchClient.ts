import { createJupiterApiClient, JupiterApiClient as JupiterApiClientType } from '@luxfi/api'
import { config } from '@luxexchange/lx/src/config'
import { createLuxFetchClient } from '@luxexchange/lx/src/data/apiClients/createLuxFetchClient'

const JupiterFetchClient = createLuxFetchClient({
  baseUrl: `${config.jupiterProxyUrl}/ultra/v1`,
  additionalHeaders: {
    'x-api-key': config.tradingApiKey,
  },
})

export const JupiterApiClient: JupiterApiClientType = createJupiterApiClient({
  fetchClient: JupiterFetchClient,
})
