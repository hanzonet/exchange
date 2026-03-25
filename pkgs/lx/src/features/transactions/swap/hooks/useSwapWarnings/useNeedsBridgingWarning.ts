import { useSelector } from 'react-redux'
import { selectHasDismissedBridgingWarning } from '@luxexchange/lx/src/features/behaviorHistory/selectors'
import type { DerivedSwapInfo } from '@luxexchange/lx/src/features/transactions/swap/types/derivedSwapInfo'
import { isBridge } from '@luxexchange/lx/src/features/transactions/swap/utils/routing'

export function useNeedsBridgingWarning(derivedSwapInfo: DerivedSwapInfo): boolean {
  const isBridgeTrade = derivedSwapInfo.trade.trade !== null && isBridge(derivedSwapInfo.trade.trade)
  const hasDismissedBridgingWarning = useSelector(selectHasDismissedBridgingWarning)
  return isBridgeTrade && !hasDismissedBridgingWarning
}
