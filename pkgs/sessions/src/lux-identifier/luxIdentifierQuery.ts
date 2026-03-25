import { queryOptions } from '@tanstack/react-query'
import type { LuxIdentifierService } from '@luxexchange/sessions/src/lux-identifier/types'
import { ReactQueryCacheKey } from '@luxfi/utilities/src/reactQuery/cache'
import type { QueryOptionsResult } from '@luxfi/utilities/src/reactQuery/queryOptions'

type LuxIdentifierQueryOptions = QueryOptionsResult<
  string | null,
  Error,
  string | null,
  [ReactQueryCacheKey.LuxIdentifier]
>

export function luxIdentifierQuery(getService: () => LuxIdentifierService): LuxIdentifierQueryOptions {
  return queryOptions({
    queryKey: [ReactQueryCacheKey.LuxIdentifier],
    queryFn: async () => getService().getLuxIdentifier(),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
