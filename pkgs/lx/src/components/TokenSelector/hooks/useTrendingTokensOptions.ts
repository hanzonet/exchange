import { GqlResult } from '@luxexchange/api'
import { useCallback } from 'react'
import { TokenOption } from '@luxexchange/lx/src/components/lists/items/types'
import { useCurrencyInfosToTokenOptions } from '@luxexchange/lx/src/components/TokenSelector/hooks/useCurrencyInfosToTokenOptions'
import { usePortfolioBalancesForAddressById } from '@luxexchange/lx/src/components/TokenSelector/hooks/usePortfolioBalancesForAddressById'
import { useTrendingTokensCurrencyInfos } from '@luxexchange/lx/src/components/TokenSelector/hooks/useTrendingTokensCurrencyInfos'
import type { AddressGroup } from '@luxexchange/lx/src/features/accounts/store/types/AccountsState'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'

export function useTrendingTokensOptions({
  addresses,
  chainFilter,
}: {
  addresses: AddressGroup
  chainFilter: Maybe<UniverseChainId>
}): GqlResult<TokenOption[] | undefined> {
  const {
    data: portfolioBalancesById,
    error: portfolioBalancesByIdError,
    refetch: portfolioBalancesByIdRefetch,
    loading: loadingPortfolioBalancesById,
  } = usePortfolioBalancesForAddressById(addresses)

  const {
    data: tokens,
    error: tokensError,
    refetch: refetchTokens,
    loading: loadingTokens,
  } = useTrendingTokensCurrencyInfos(chainFilter)

  const tokenOptions = useCurrencyInfosToTokenOptions({ currencyInfos: tokens, portfolioBalancesById })

  const refetch = useCallback(() => {
    portfolioBalancesByIdRefetch?.()
    refetchTokens()
  }, [portfolioBalancesByIdRefetch, refetchTokens])

  const error =
    (!portfolioBalancesById ? portfolioBalancesByIdError : undefined) || (!tokenOptions ? tokensError : undefined)

  return {
    data: tokenOptions,
    refetch,
    error,
    loading: loadingPortfolioBalancesById || loadingTokens,
  }
}
