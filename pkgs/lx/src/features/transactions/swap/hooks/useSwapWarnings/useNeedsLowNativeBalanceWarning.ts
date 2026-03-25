import { useSelector } from 'react-redux'

import { selectHasDismissedLowNetworkTokenWarning } from '@luxexchange/lx/src/features/behaviorHistory/selectors'

import { DerivedSwapInfo } from '@luxexchange/lx/src/features/transactions/swap/types/derivedSwapInfo'
import { CurrencyField } from '@luxexchange/lx/src/types/currency'

export function useNeedsLowNativeBalanceWarning({
  derivedSwapInfo,
  isMax,
}: {
  derivedSwapInfo: DerivedSwapInfo
  isMax: boolean
}): boolean {
  const needsLowNativeBalanceWarning = isMax && derivedSwapInfo.currencyAmounts[CurrencyField.INPUT]?.currency.isNative
  const hasDismissedLowNetworkTokenWarning = useSelector(selectHasDismissedLowNetworkTokenWarning)
  return !!needsLowNativeBalanceWarning && !hasDismissedLowNetworkTokenWarning
}
