import { ProtocolVersion } from '@uniswap/client-data-api/dist/data/v1/poolTypes_pb'
import { useMemo } from 'react'
import { OnchainItemListOptionType, PoolOption } from '@luxexchange/lx/src/components/lists/items/types'
import { ZERO_ADDRESS } from '@luxexchange/lx/src/constants/misc'
import { V2_DEFAULT_FEE_TIER } from '@luxexchange/lx/src/constants/pools'
import { normalizeCurrencyIdForMapLookup } from '@luxexchange/lx/src/data/cache'
import { PoolSearchHistoryResult } from '@luxexchange/lx/src/features/search/SearchHistoryResult'
import { useCurrencyInfos } from '@luxexchange/lx/src/features/tokens/useCurrencyInfo'
import { CurrencyId } from '@luxexchange/lx/src/types/currency'

export function usePoolSearchResultsToPoolOptions(searchResults: PoolSearchHistoryResult[]): PoolOption[] {
  // combine all pool search results' tokens' currencyIds in an array of de-duped currencyIds
  // & then fetch currencyInfos for all
  const currencyIds: CurrencyId[] = useMemo(
    () =>
      Array.from(
        new Set(
          searchResults.flatMap((result) => [
            normalizeCurrencyIdForMapLookup(result.token0CurrencyId),
            normalizeCurrencyIdForMapLookup(result.token1CurrencyId),
          ]),
        ),
      ),
    [searchResults],
  )

  const currencyInfos = useCurrencyInfos(currencyIds)

  return useMemo(() => {
    // create a map of { currencyId: currencyInfo }
    const currencyIdToCurrencyInfo = Object.fromEntries(
      currencyInfos.map((currencyInfo) => [normalizeCurrencyIdForMapLookup(currencyInfo?.currencyId), currencyInfo]),
    )

    // build PoolOptions
    return searchResults
      .map((searchResult): PoolOption | undefined => {
        const { chainId, poolId, protocolVersion, hookAddress, feeTier, token0CurrencyId, token1CurrencyId } =
          searchResult
        const token0CurrencyInfo = currencyIdToCurrencyInfo[normalizeCurrencyIdForMapLookup(token0CurrencyId)]
        const token1CurrencyInfo = currencyIdToCurrencyInfo[normalizeCurrencyIdForMapLookup(token1CurrencyId)]

        if (!poolId || !token0CurrencyInfo || !token1CurrencyInfo) {
          return undefined
        }

        return {
          type: OnchainItemListOptionType.Pool,
          poolId,
          chainId,
          protocolVersion,
          hookAddress: hookAddress && hookAddress !== ZERO_ADDRESS ? hookAddress : undefined,
          feeTier: protocolVersion === ProtocolVersion.V2 ? V2_DEFAULT_FEE_TIER : feeTier,
          token0CurrencyInfo,
          token1CurrencyInfo,
        }
      })
      .filter((option): option is PoolOption => option !== undefined)
  }, [currencyInfos, searchResults])
}
