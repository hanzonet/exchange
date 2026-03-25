import { TokenApprovalTransactionStep } from '@luxexchange/lx/src/features/transactions/steps/approve'
import { TokenRevocationTransactionStep } from '@luxexchange/lx/src/features/transactions/steps/revoke'
import type { DEXSignatureStep } from '@luxexchange/lx/src/features/transactions/swap/steps/signOrder'

export type DEXSwapFlow = {
  revocation?: TokenRevocationTransactionStep
  approval?: TokenApprovalTransactionStep
  signOrder: DEXSignatureStep
}

export type DEXSwapSteps = NonNullable<DEXSwapFlow[keyof DEXSwapFlow]>

export function orderDEXSteps(flow: DEXSwapFlow): DEXSwapSteps[] {
  const steps: DEXSwapSteps[] = []

  if (flow.revocation) {
    steps.push(flow.revocation)
  }

  if (flow.approval) {
    steps.push(flow.approval)
  }

  steps.push(flow.signOrder)

  return steps
}
