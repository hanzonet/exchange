import { SwapTxAndGasInfoService } from 'uniswap/src/features/transactions/swap/review/services/swapTxAndGasInfoService/swapTxAndGasInfoService'
import {
  getLXSwapTxAndGasInfo,
  processLXResponse,
} from 'uniswap/src/features/transactions/swap/review/services/swapTxAndGasInfoService/lxswap/utils'
import { LxSwapTrade } from 'uniswap/src/features/transactions/swap/types/trade'

export function createLxSwapSwapTxAndGasInfoService(): SwapTxAndGasInfoService<LxSwapTrade> {
  const service: SwapTxAndGasInfoService<LxSwapTrade> = {
    async getSwapTxAndGasInfo(params) {
      const permitData = params.trade.quote.permitData

      const swapTxInfo = processLXResponse({ permitData })
      return getLXSwapTxAndGasInfo({ ...params, swapTxInfo })
    },
  }

  return service
}
