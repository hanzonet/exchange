import { createDataServiceApiClient } from '@luxexchange/api'
import { lxUrls } from 'uniswap/src/constants/urls'
import { createLxFetchClient } from 'uniswap/src/data/apiClients/createLxFetchClient'

const DataServiceFetchClient = createLxFetchClient({
  baseUrl: lxUrls.dataApiServiceUrl,
})

export const DataServiceApiClient = createDataServiceApiClient({
  fetchClient: DataServiceFetchClient,
})
