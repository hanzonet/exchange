import {
  ActivityIdToVisibility,
  CurrencyIdToVisibility,
  NFTKeyToVisibility,
  PositionKeyToVisibility,
} from 'uniswap/src/features/visibility/slice'
import { LxRootState } from 'uniswap/src/state'

export const selectPositionsVisibility = (state: LxRootState): PositionKeyToVisibility =>
  state.visibility.positions

export const selectTokensVisibility = (state: LxRootState): CurrencyIdToVisibility => state.visibility.tokens

export const selectNftsVisibility = (state: LxRootState): NFTKeyToVisibility => state.visibility.nfts

export const selectActivityVisibility = (state: LxRootState): ActivityIdToVisibility => state.visibility.activity
