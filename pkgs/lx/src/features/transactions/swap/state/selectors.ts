import type { SwapSettingsState } from '@luxexchange/lx/src/features/transactions/swap/state/slice'
import type { LuxRootState } from '@luxexchange/lx/src/state'

export const selectFilteredChainIds = (state: LuxRootState): SwapSettingsState['filteredChainIds'] =>
  state.swapSettings.filteredChainIds
