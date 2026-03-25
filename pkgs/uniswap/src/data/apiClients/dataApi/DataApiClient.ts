import { createDataServiceApiClient } from '@luxexchange/api'
import { uniswapUrls } from 'uniswap/src/constants/urls'
import { createUniswapFetchClient } from 'uniswap/src/data/apiClients/createUniswapFetchClient'

const DataServiceFetchClient = createUniswapFetchClient({
  baseUrl: uniswapUrls.dataApiServiceUrl,
})

export const DataServiceApiClient = createDataServiceApiClient({
  fetchClient: DataServiceFetchClient,
})
