import { createDataServiceApiClient } from '@luxexchange/api'
import { luxUrls } from 'uniswap/src/constants/urls'
import { createLuxFetchClient } from 'uniswap/src/data/apiClients/createLuxFetchClient'

const DataServiceFetchClient = createLuxFetchClient({
  baseUrl: luxUrls.dataApiServiceUrl,
})

export const DataServiceApiClient = createDataServiceApiClient({
  fetchClient: DataServiceFetchClient,
})
