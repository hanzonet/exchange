import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { normalizeCurrencyIdForMapLookup } from 'uniswap/src/data/cache'
import { makeSelectHasTokenFavorited } from 'uniswap/src/features/favorites/selectors'
import { LxState } from 'uniswap/src/state/lxReducer'

export function useSelectHasTokenFavorited(currencyId: string): boolean {
  const selectHasTokenFavorited = useMemo(makeSelectHasTokenFavorited, [])
  return useSelector((state: LxState) =>
    selectHasTokenFavorited(state, normalizeCurrencyIdForMapLookup(currencyId)),
  )
}
