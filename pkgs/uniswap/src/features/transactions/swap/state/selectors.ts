import type { SwapSettingsState } from 'uniswap/src/features/transactions/swap/state/slice'
import type { LxRootState } from 'uniswap/src/state'

export const selectFilteredChainIds = (state: LxRootState): SwapSettingsState['filteredChainIds'] =>
  state.swapSettings.filteredChainIds
