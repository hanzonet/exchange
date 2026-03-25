import { TradeType } from '@uniswap/sdk-core'
import { memo, useMemo } from 'react'
import { useOnRetrySwap } from '@luxexchange/lx/src/components/activity/hooks/useOnRetrySwap'
import { TransactionSummaryLayout } from '@luxexchange/lx/src/components/activity/summaries/TransactionSummaryLayout'
import type { SummaryItemProps } from '@luxexchange/lx/src/components/activity/types'
import { TXN_HISTORY_ICON_SIZE } from '@luxexchange/lx/src/components/activity/utils'
import { SplitLogo } from '@luxexchange/lx/src/components/CurrencyLogo/SplitLogo'
import { useLocalizationContext } from '@luxexchange/lx/src/features/language/LocalizationContext'
import { useCurrencyInfo } from '@luxexchange/lx/src/features/tokens/useCurrencyInfo'
import { getAmountsFromTrade } from '@luxexchange/lx/src/features/transactions/swap/utils/getAmountsFromTrade'
import type {
  ExactInputSwapTransactionInfo,
  ExactOutputSwapTransactionInfo,
  TransactionDetails,
} from '@luxexchange/lx/src/features/transactions/types/transactionDetails'
import { isConfirmedSwapTypeInfo } from '@luxexchange/lx/src/features/transactions/types/utils'
import { getFormattedCurrencyAmount, getSymbolDisplayText } from '@luxexchange/lx/src/utils/currency'

function _SwapSummaryItem({
  transaction,
  swapCallbacks,
  index,
  isExternalProfile,
}: SummaryItemProps & {
  transaction: TransactionDetails & {
    typeInfo: ExactOutputSwapTransactionInfo | ExactInputSwapTransactionInfo
  }
}): JSX.Element {
  const { typeInfo } = transaction
  const inputCurrencyInfo = useCurrencyInfo(typeInfo.inputCurrencyId)
  const outputCurrencyInfo = useCurrencyInfo(typeInfo.outputCurrencyId)
  const formatter = useLocalizationContext()
  const onRetry = useOnRetrySwap(transaction, swapCallbacks)

  const caption = useMemo(() => {
    if (!inputCurrencyInfo || !outputCurrencyInfo) {
      return ''
    }

    const { inputCurrencyAmountRaw, outputCurrencyAmountRaw } = getAmountsFromTrade(typeInfo)
    const { currency: inputCurrency } = inputCurrencyInfo
    const { currency: outputCurrency } = outputCurrencyInfo
    const currencyAmount = getFormattedCurrencyAmount({
      currency: inputCurrency,
      amount: inputCurrencyAmountRaw,
      formatter,
      isApproximateAmount: isConfirmedSwapTypeInfo(typeInfo) ? false : typeInfo.tradeType === TradeType.EXACT_OUTPUT,
    })
    const otherCurrencyAmount = getFormattedCurrencyAmount({
      currency: outputCurrency,
      amount: outputCurrencyAmountRaw,
      formatter,
      isApproximateAmount: isConfirmedSwapTypeInfo(typeInfo) ? false : typeInfo.tradeType === TradeType.EXACT_INPUT,
    })
    return `${currencyAmount}${getSymbolDisplayText(
      inputCurrency.symbol,
    )} → ${otherCurrencyAmount}${getSymbolDisplayText(outputCurrency.symbol)}`
  }, [inputCurrencyInfo, outputCurrencyInfo, formatter, typeInfo])

  const icon = useMemo(
    () => (
      <SplitLogo
        chainId={transaction.chainId}
        inputCurrencyInfo={inputCurrencyInfo}
        outputCurrencyInfo={outputCurrencyInfo}
        size={TXN_HISTORY_ICON_SIZE}
      />
    ),
    [inputCurrencyInfo, outputCurrencyInfo, transaction.chainId],
  )

  return (
    <TransactionSummaryLayout
      caption={caption}
      icon={icon}
      index={index}
      transaction={transaction}
      isExternalProfile={isExternalProfile}
      onRetry={onRetry}
    />
  )
}

export const SwapSummaryItem = memo(_SwapSummaryItem)
