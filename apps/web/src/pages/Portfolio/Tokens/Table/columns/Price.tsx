import { memo, useMemo } from 'react'
<<<<<<< Updated upstream
import { useLocalizationContext } from '@luxexchange/lx/src/features/language/LocalizationContext'
import { NumberType } from '@luxfi/utilities/src/format/types'
=======
import { useLocalizationContext } from '@luxexchange/lx/src/features/language/LocalizationContext'
import { NumberType } from '@luxfi/utilities/src/format/types'
>>>>>>> Stashed changes
import { ValueWithFadedDecimals } from '~/pages/Portfolio/components/ValueWithFadedDecimals/ValueWithFadedDecimals'
import { EmptyTableCell } from '~/pages/Portfolio/EmptyTableCell'
import { TokenData } from '~/pages/Portfolio/Tokens/hooks/useTransformTokenTableData'

export const Price = memo(function Price({ price }: { price: TokenData['price'] }) {
  const { convertFiatAmountFormatted } = useLocalizationContext()

  const formattedPrice = useMemo(() => {
    return convertFiatAmountFormatted(price, NumberType.FiatTokenPrice)
  }, [price, convertFiatAmountFormatted])

  if (!price && price !== 0) {
    return <EmptyTableCell />
  }

  return <ValueWithFadedDecimals value={formattedPrice} />
})
Price.displayName = 'Price'
