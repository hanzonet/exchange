import { TransactionRequest as LiquidityTransactionRequest } from '@uniswap/client-liquidity/dist/uniswap/liquidity/v1/types_pb'
<<<<<<< Updated upstream
import { TradingApi } from '@universe/api'
import { UniverseChainId } from 'lx/src/features/chains/types'
import { SetCurrentStepFn } from 'lx/src/features/transactions/swap/types/swapCallback'
=======
import { TradingApi } from '@luxexchange/api'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { SetCurrentStepFn } from '@luxexchange/lx/src/features/transactions/swap/types/swapCallback'
>>>>>>> Stashed changes

export interface LpIncentivesClaimParams {
  address: string
  claimData: TradingApi.TransactionRequest | LiquidityTransactionRequest
  tokenAddress: string
  setCurrentStep: SetCurrentStepFn
  selectChain: (chainId: number) => Promise<boolean>
  walletChainId?: UniverseChainId
  onSuccess: () => void
  onFailure: (error: Error) => void
}
