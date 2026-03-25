import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { TokenOption } from '@luxexchange/lx/src/components/lists/items/types'
import { MAX_RECENT_SEARCH_RESULTS } from '@luxexchange/lx/src/components/TokenSelector/constants'
import { currencyInfosToTokenOptions } from '@luxexchange/lx/src/components/TokenSelector/hooks/useCurrencyInfosToTokenOptions'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { isUniverseChainId } from '@luxexchange/lx/src/features/chains/utils'
import { CurrencyInfo } from '@luxexchange/lx/src/features/dataApi/types'
import { SearchHistoryResultType, TokenSearchHistoryResult } from '@luxexchange/lx/src/features/search/SearchHistoryResult'
import { selectSearchHistory } from '@luxexchange/lx/src/features/search/selectSearchHistory'
import { useCurrencyInfos } from '@luxexchange/lx/src/features/tokens/useCurrencyInfo'
import { buildCurrencyId, buildNativeCurrencyId } from '@luxexchange/lx/src/utils/currencyId'

export function useRecentlySearchedTokens(
  chainFilter: UniverseChainId | null,
  numberOfResults = MAX_RECENT_SEARCH_RESULTS,
): TokenOption[] {
  const searchHistory = useSelector(selectSearchHistory)

  const searchHistoryCurrencyInfos = useSearchHistoryToCurrencyInfos(
    searchHistory
      .filter(
        (searchResult): searchResult is TokenSearchHistoryResult => searchResult.type === SearchHistoryResultType.Token,
      )
      // Filter out invalid chainIds to prevent crashes from corrupted search history data
      .filter((searchResult) => isUniverseChainId(searchResult.chainId))
      .filter((searchResult) => (chainFilter ? searchResult.chainId === chainFilter : true))
      .slice(0, numberOfResults),
  )

  return useMemo(() => {
    return currencyInfosToTokenOptions(searchHistoryCurrencyInfos) ?? []
  }, [searchHistoryCurrencyInfos])
}

function useSearchHistoryToCurrencyInfos(searchHistory: TokenSearchHistoryResult[]): Maybe<CurrencyInfo>[] {
  const currencyIds = searchHistory.map((searchResult) => {
    return searchResult.address
      ? buildCurrencyId(searchResult.chainId, searchResult.address)
      : buildNativeCurrencyId(searchResult.chainId)
  })

  return useCurrencyInfos(currencyIds)
}
