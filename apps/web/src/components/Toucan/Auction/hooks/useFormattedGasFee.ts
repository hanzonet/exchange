import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { useMemo } from 'react'
<<<<<<< Updated upstream
import { useLocalizationContext } from 'lx/src/features/language/LocalizationContext'
import { useUSDCValue } from 'lx/src/features/transactions/hooks/useUSDCPriceWrapper'
import { NumberType } from 'utilities/src/format/types'
=======
import { useLocalizationContext } from '@luxexchange/lx/src/features/language/LocalizationContext'
import { useUSDCValue } from '@luxexchange/lx/src/features/transactions/hooks/useUSDCPriceWrapper'
import { NumberType } from '@luxfi/utilities/src/format/types'
>>>>>>> Stashed changes

const DEFAULT_PLACEHOLDER = '—'

interface UseFormattedGasFeeResult {
  formattedGasFee: string | undefined
  gasFeeUsdValue: CurrencyAmount<Currency> | null
}

export function useFormattedGasFee({
  gasFeeCurrencyAmount,
  placeholder = DEFAULT_PLACEHOLDER,
}: {
  gasFeeCurrencyAmount: CurrencyAmount<Currency> | undefined
  placeholder?: string
}): UseFormattedGasFeeResult {
  const { formatCurrencyAmount, convertFiatAmountFormatted } = useLocalizationContext()
  const gasFeeUsdValue = useUSDCValue(gasFeeCurrencyAmount)

  const formattedGasFee = useMemo(() => {
    if (!gasFeeCurrencyAmount) {
      return undefined
    }

    if (gasFeeUsdValue) {
      const fiatValue = Number(gasFeeUsdValue.toExact())
      if (Number.isFinite(fiatValue)) {
        return convertFiatAmountFormatted(fiatValue, NumberType.FiatGasPrice, placeholder)
      }
    }

    return `${formatCurrencyAmount({ value: gasFeeCurrencyAmount, type: NumberType.TokenNonTx })} ${
      gasFeeCurrencyAmount.currency.symbol ?? ''
    }`.trim()
  }, [convertFiatAmountFormatted, formatCurrencyAmount, gasFeeCurrencyAmount, gasFeeUsdValue, placeholder])

  return { formattedGasFee, gasFeeUsdValue }
}
