import { useLuxContext } from '@luxexchange/lx/src/contexts/LuxContext'
import { useSwapFormStore } from '@luxexchange/lx/src/features/transactions/swap/stores/swapFormStore/useSwapFormStore'
import { useEvent } from '@luxfi/utilities/src/react/hooks'

export const useHideTokenSelector = (): (() => void) => {
  const { updateSwapForm, isSelectingCurrencyFieldPrefilled } = useSwapFormStore((s) => ({
    updateSwapForm: s.updateSwapForm,
    isSelectingCurrencyFieldPrefilled: s.isSelectingCurrencyFieldPrefilled,
  }))
  const { setIsSwapTokenSelectorOpen } = useLuxContext()

  return useEvent(() => {
    updateSwapForm({
      selectingCurrencyField: undefined,
      isSelectingCurrencyFieldPrefilled: false,
      // reset the filtered chain ids when coming back in from a prefill so it's not persisted forever
      ...(isSelectingCurrencyFieldPrefilled ? { filteredChainIds: {} } : {}),
    })
    setIsSwapTokenSelectorOpen(false) // resets force flag for web on close as cleanup
  })
}
