import { createContext } from 'react'
import type { SwapTxStore } from '@luxexchange/lx/src/features/transactions/swap/stores/swapTxStore/createSwapTxStore'

export const SwapTxStoreContext = createContext<SwapTxStore | undefined>(undefined)
