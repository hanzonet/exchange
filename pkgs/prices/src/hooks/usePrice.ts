import { queryOptions, skipToken, useQuery } from '@tanstack/react-query'
import { usePricesContext } from '@luxexchange/prices/src/context/PriceServiceContext'
import { priceKeys } from '@luxexchange/prices/src/queries/priceKeys'
import { tokenPriceQueryOptions } from '@luxexchange/prices/src/queries/tokenPriceQueryOptions'
import type { TokenPriceData } from '@luxexchange/prices/src/types'
import { useEffect } from 'react'

interface UsePriceOptions {
  chainId: number | undefined
  address: string | undefined
  live?: boolean
}

/**
 * Hook to get the live price for a token.
 * Reads from React Query cache and auto-subscribes via websocket.
 *
 * Requires a PriceServiceProvider in the tree.
 */
export function usePrice(options: UsePriceOptions): number | undefined {
  const { chainId, address, live = true } = options
  const { wsClient } = usePricesContext()

  const enabled = chainId !== undefined && !!address

  // Data is populated externally via queryClient.setQueryData from WS messages.
  const { data } = useQuery(
    enabled
      ? tokenPriceQueryOptions(chainId, address)
      : queryOptions<TokenPriceData>({ queryKey: priceKeys.all, queryFn: skipToken, enabled: false }),
  )

  useEffect(() => {
    if (!enabled || !live) {
      return undefined
    }
    return wsClient.subscribe({
      channel: 'token_price',
      params: { chainId, tokenAddress: address.toLowerCase() },
    })
  }, [enabled, live, chainId, address, wsClient])

  return enabled ? (data?.price ?? undefined) : undefined
}
