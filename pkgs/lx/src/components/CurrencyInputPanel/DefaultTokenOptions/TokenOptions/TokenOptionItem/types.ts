import type { CurrencyInfo } from '@luxexchange/lx/src/features/dataApi/types'
import type { CurrencyField } from '@luxexchange/lx/src/types/currency'

export type TokenOptionItemProps = {
  currencyInfo: CurrencyInfo
  index: number
  numOptions: number
  currencyField: CurrencyField
}
