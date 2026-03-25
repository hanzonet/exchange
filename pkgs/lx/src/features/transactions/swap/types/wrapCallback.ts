import { Currency, CurrencyAmount } from '@luxfi/amm-core'
import { GasEstimate } from '@luxfi/api'
import { ValidatedTransactionRequest } from '@luxexchange/lx/src/features/transactions/types/transactionRequests'
import { WrapType } from '@luxexchange/lx/src/features/transactions/types/wrap'
import { AccountDetails } from '@luxexchange/lx/src/features/wallet/types/AccountDetails'

export type WrapCallbackParams = {
  account: AccountDetails
  inputCurrencyAmount: CurrencyAmount<Currency>
  wrapType: WrapType.Wrap | WrapType.Unwrap
  onSuccess: () => void
  onFailure: () => void
  txRequest: ValidatedTransactionRequest
  txId?: string
  gasEstimate?: GasEstimate
}

export type WrapCallback = (params: WrapCallbackParams) => void
