import { Currency, CurrencyAmount } from '@luxamm/sdk-core'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { CurrencyInfo } from '@luxexchange/lx/src/features/dataApi/types'
import { TradeWithStatus } from '@luxexchange/lx/src/features/transactions/swap/types/trade'
import { BaseDerivedInfo } from '@luxexchange/lx/src/features/transactions/types/baseDerivedInfo'
import { WrapType } from '@luxexchange/lx/src/features/transactions/types/wrap'
import { CurrencyField } from '@luxexchange/lx/src/types/currency'

export type DerivedSwapInfo<
  TInput = CurrencyInfo,
  TOutput extends CurrencyInfo = CurrencyInfo,
> = BaseDerivedInfo<TInput> & {
  chainId: UniverseChainId
  currencies: BaseDerivedInfo<TInput>['currencies'] & {
    [CurrencyField.OUTPUT]: Maybe<TOutput>
  }
  currencyAmounts: BaseDerivedInfo<TInput>['currencyAmounts'] & {
    [CurrencyField.OUTPUT]: Maybe<CurrencyAmount<Currency>>
  }
  currencyAmountsUSDValue: {
    [CurrencyField.INPUT]: Maybe<CurrencyAmount<Currency>>
    [CurrencyField.OUTPUT]: Maybe<CurrencyAmount<Currency>>
  }
  currencyBalances: BaseDerivedInfo<TInput>['currencyBalances'] & {
    [CurrencyField.OUTPUT]: Maybe<CurrencyAmount<Currency>>
  }
  outputAmountUserWillReceive: Maybe<CurrencyAmount<Currency>>
  focusOnCurrencyField: CurrencyField | null
  trade: TradeWithStatus
  wrapType: WrapType
  selectingCurrencyField?: CurrencyField
  txId?: string
}
