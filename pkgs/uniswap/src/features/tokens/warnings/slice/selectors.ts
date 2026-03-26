import {
  SerializedTokenMap,
  TokenDismissInfo,
  TokenWarningDismissal,
} from 'uniswap/src/features/tokens/warnings/slice/types'
import { LxState } from 'uniswap/src/state/lxReducer'

// selectors

export const dismissedWarningTokensSelector = (state: LxState): SerializedTokenMap<TokenWarningDismissal> =>
  state.tokens.dismissedTokenWarnings

export const dismissedBridgedAssetWarningsSelector = (state: LxState): SerializedTokenMap<TokenDismissInfo> =>
  state.tokens.dismissedBridgedAssetWarnings

export const dismissedCompatibleAddressWarningsSelector = (state: LxState): SerializedTokenMap<TokenDismissInfo> =>
  state.tokens.dismissedCompatibleAddressWarnings
