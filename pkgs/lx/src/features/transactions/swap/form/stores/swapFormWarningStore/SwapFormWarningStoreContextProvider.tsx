import { useState } from 'react'
import { createSwapFormWarningStore } from '@luxexchange/lx/src/features/transactions/swap/form/stores/swapFormWarningStore/createSwapFormWarningStore'
import { SwapFormWarningStoreContext } from '@luxexchange/lx/src/features/transactions/swap/form/stores/swapFormWarningStore/SwapFormWarningStoreContext'

export const SwapFormWarningStoreContextProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [store] = useState(() => createSwapFormWarningStore())

  return <SwapFormWarningStoreContext.Provider value={store}>{children}</SwapFormWarningStoreContext.Provider>
}
