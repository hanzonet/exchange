import { skipToken, type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type ScreenRequest, type ScreenResponse, type UseQueryApiHelperHookArgs } from '@luxexchange/api'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { LuxApiClient } from '@luxexchange/lx/src/data/apiClients/luxApi/LuxApiClient'
import { ReactQueryCacheKey } from '@luxfi/utilities/src/reactQuery/cache'

export function useTrmScreenQuery({
  params,
  ...rest
}: UseQueryApiHelperHookArgs<ScreenRequest, ScreenResponse>): UseQueryResult<ScreenResponse> {
  const queryKey = [ReactQueryCacheKey.LuxApi, luxUrls.trmPath, params]

  return useQuery<ScreenResponse>({
    queryKey,
    queryFn: params ? async (): Promise<ScreenResponse> => await LuxApiClient.fetchTrmScreen(params) : skipToken,
    ...rest,
  })
}
