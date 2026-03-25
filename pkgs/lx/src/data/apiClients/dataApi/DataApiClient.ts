import { createDataServiceApiClient } from '@luxfi/api'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { createLuxFetchClient } from '@luxexchange/lx/src/data/apiClients/createLuxFetchClient'

const DataServiceFetchClient = createLuxFetchClient({
  baseUrl: luxUrls.dataApiServiceUrl,
})

export const DataServiceApiClient = createDataServiceApiClient({
  fetchClient: DataServiceFetchClient,
})
