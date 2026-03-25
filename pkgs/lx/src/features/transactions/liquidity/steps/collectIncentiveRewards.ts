import { OnChainTransactionFields, TransactionStepType } from '@luxexchange/lx/src/features/transactions/steps/types'

export interface CollectLpIncentiveRewardsTransactionStep extends OnChainTransactionFields {
  type: TransactionStepType.CollectLpIncentiveRewardsTransactionStep
}
