import { createSelector, Selector } from '@reduxjs/toolkit'
import { normalizeTokenAddressForCache } from '@luxexchange/lx/src/data/cache'
import { PortfolioState, TokenBalanceOverride } from '@luxexchange/lx/src/features/portfolio/slice/slice'
import { LuxState } from '@luxexchange/lx/src/state/luxReducer'

export const selectTokenBalanceOverrides = (state: LuxState): PortfolioState['tokenBalanceOverrides'] =>
  state.portfolio.tokenBalanceOverrides

export const makeSelectTokenBalanceOverridesForWalletAddress = (): Selector<
  LuxState,
  undefined | TokenBalanceOverride,
  [Address]
> =>
  createSelector(
    selectTokenBalanceOverrides,
    (_: LuxState, walletAddress: Address) => walletAddress,
    (tokenBalanceOverrides, walletAddress) => tokenBalanceOverrides[normalizeTokenAddressForCache(walletAddress)],
  )
