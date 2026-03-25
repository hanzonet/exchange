import { usePrice } from '@luxexchange/prices'
import type { CurrencyId } from '@luxexchange/lx/src/types/currency'
import { currencyIdToAddress, currencyIdToChain } from '@luxexchange/lx/src/utils/currencyId'

export function useTokenSpotPriceCentralized(currencyId: CurrencyId): number | undefined {
  const chainId = currencyIdToChain(currencyId) ?? undefined
  const address = currencyIdToAddress(currencyId)
  return usePrice({ chainId, address })
}
