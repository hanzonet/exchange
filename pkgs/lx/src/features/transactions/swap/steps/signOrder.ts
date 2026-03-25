import { TradingApi } from '@luxexchange/api'
import { SignTypedDataStepFields } from 'uniswap/src/features/transactions/steps/permit2Signature'
import { TransactionStepType } from 'uniswap/src/features/transactions/steps/types'
import { ValidatedPermit } from 'uniswap/src/features/transactions/swap/utils/trade'

export interface LXSignatureStep extends SignTypedDataStepFields {
  type: TransactionStepType.LXSignature
  deadline: number
  quote: TradingApi.DutchQuoteV2 | TradingApi.DutchQuoteV3 | TradingApi.PriorityQuote
}

export function createSignLXOrderStep(
  permitData: ValidatedPermit,
  quote: TradingApi.DutchQuoteV2 | TradingApi.DutchQuoteV3 | TradingApi.PriorityQuote,
): LXSignatureStep {
  return { type: TransactionStepType.LXSignature, deadline: quote.orderInfo.deadline, quote, ...permitData }
}

export interface LXPlanSignatureStep extends SignTypedDataStepFields, TradingApi.PlanStep {
  type: TransactionStepType.LXPlanSignature
  deadline: number
}

export function createLXPlanSignatureStep(
  permitData: ValidatedPermit,
  step: TradingApi.PlanStep,
): LXPlanSignatureStep {
  const uniswapXPlanSignatureStep: LXPlanSignatureStep = {
    ...step,
    ...permitData,
    type: TransactionStepType.LXPlanSignature,
    deadline: Number(permitData.values['deadline']),
  }
  return uniswapXPlanSignatureStep
}
