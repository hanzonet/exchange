import {
  ActivityIdToVisibility,
  CurrencyIdToVisibility,
  NFTKeyToVisibility,
  PositionKeyToVisibility,
} from '@luxexchange/lx/src/features/visibility/slice'
import { LuxRootState } from '@luxexchange/lx/src/state'

export const selectPositionsVisibility = (state: LuxRootState): PositionKeyToVisibility =>
  state.visibility.positions

export const selectTokensVisibility = (state: LuxRootState): CurrencyIdToVisibility => state.visibility.tokens

export const selectNftsVisibility = (state: LuxRootState): NFTKeyToVisibility => state.visibility.nfts

export const selectActivityVisibility = (state: LuxRootState): ActivityIdToVisibility => state.visibility.activity
