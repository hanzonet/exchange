import { createContext } from 'react'
import type { createSwapDependenciesStore } from '@luxexchange/lx/src/features/transactions/swap/stores/swapDependenciesStore/createSwapDependenciesStore'

export const SwapDependenciesStoreContext = createContext<ReturnType<typeof createSwapDependenciesStore> | null>(null)
