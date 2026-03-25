import { useIsAmountSelectionInvalid } from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormButton/hooks/useIsAmountSelectionInvalid'
import { useIsTokenSelectionInvalid } from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormButton/hooks/useIsTokenSelectionInvalid'
import { useIsTradeIndicative } from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormButton/hooks/useIsTradeIndicative'
import { useParsedSwapWarnings } from '@luxexchange/lx/src/features/transactions/swap/hooks/useSwapWarnings/useSwapWarnings'

export const useIsBlockingWithCustomMessage = (): boolean => {
  const isTokenSelectionInvalid = useIsTokenSelectionInvalid()
  const isAmountSelectionInvalid = useIsAmountSelectionInvalid()
  const { insufficientBalanceWarning, insufficientGasFundsWarning } = useParsedSwapWarnings()
  const isIndicative = useIsTradeIndicative()

  return Boolean(
    isTokenSelectionInvalid ||
      isAmountSelectionInvalid ||
      insufficientBalanceWarning ||
      insufficientGasFundsWarning ||
      isIndicative,
  )
}
