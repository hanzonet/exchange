import { useQueryClient } from '@tanstack/react-query'
import { logger } from '@luxfi/utilities/src/logger/logger'
import { useEvent } from '@luxfi/utilities/src/react/hooks'
import { ReactQueryCacheKey } from '@luxfi/utilities/src/reactQuery/cache'

export function useResetUnitagsQueries(): () => void {
  const queryClient = useQueryClient()

  return useEvent(() => {
    queryClient.resetQueries({ queryKey: [ReactQueryCacheKey.UnitagsApi] }).catch((error) => {
      logger.error(error, {
        tags: {
          file: 'useResetUnitagsQueries.ts',
          function: 'queryClient.resetQueries',
        },
      })
    })
  })
}
