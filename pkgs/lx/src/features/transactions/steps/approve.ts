import { Currency } from '@luxfi/amm-core'
import { RevokeApproveFields, TransactionStepType } from '@luxexchange/lx/src/features/transactions/steps/types'
import { ValidatedTransactionRequest } from '@luxexchange/lx/src/features/transactions/types/transactionRequests'
import { parseERC20ApproveCalldata } from '@luxexchange/lx/src/utils/approvals'

export interface TokenApprovalTransactionStep extends RevokeApproveFields {
  type: TransactionStepType.TokenApprovalTransaction
}

export function createApprovalTransactionStep({
  amount,
  txRequest,
  tokenAddress,
  pair,
  chainId,
}: {
  amount: TokenApprovalTransactionStep['amount']
  txRequest?: ValidatedTransactionRequest
  pair?: [Currency, Currency]
  tokenAddress?: TokenApprovalTransactionStep['tokenAddress']
  chainId?: TokenApprovalTransactionStep['chainId']
}): TokenApprovalTransactionStep | undefined {
  if (!txRequest?.data || !amount || !chainId || !tokenAddress) {
    return undefined
  }

  const type = TransactionStepType.TokenApprovalTransaction
  const { spender } = parseERC20ApproveCalldata(txRequest.data.toString())

  return { type, txRequest, tokenAddress, amount, pair, spender, chainId }
}
