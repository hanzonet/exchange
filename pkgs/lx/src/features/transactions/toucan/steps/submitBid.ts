import { OnChainTransactionFields, TransactionStepType } from '@luxexchange/lx/src/features/transactions/steps/types'

export interface ToucanBidTransactionStep extends OnChainTransactionFields {
  type: TransactionStepType.ToucanBidTransactionStep
}
