import { Currency, CurrencyAmount } from '@luxamm/sdk-core'
import { GasEstimate } from '@luxexchange/api'
import { ValidatedTransactionRequest } from 'uniswap/src/features/transactions/types/transactionRequests'
import { WrapType } from 'uniswap/src/features/transactions/types/wrap'

export type WrapCallbackParams = {
  address: string
  inputCurrencyAmount: CurrencyAmount<Currency>
  wrapType: WrapType.Wrap | WrapType.Unwrap
  onSuccess: () => void
  onFailure: () => void
  txRequest: ValidatedTransactionRequest
  txId?: string
  gasEstimate?: GasEstimate
}

export type WrapCallback = (params: WrapCallbackParams) => void
