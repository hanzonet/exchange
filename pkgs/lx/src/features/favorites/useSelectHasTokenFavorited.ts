import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { normalizeCurrencyIdForMapLookup } from '@luxexchange/lx/src/data/cache'
import { makeSelectHasTokenFavorited } from '@luxexchange/lx/src/features/favorites/selectors'
import { LuxState } from '@luxexchange/lx/src/state/luxReducer'

export function useSelectHasTokenFavorited(currencyId: string): boolean {
  const selectHasTokenFavorited = useMemo(makeSelectHasTokenFavorited, [])
  return useSelector((state: LuxState) =>
    selectHasTokenFavorited(state, normalizeCurrencyIdForMapLookup(currencyId)),
  )
}
