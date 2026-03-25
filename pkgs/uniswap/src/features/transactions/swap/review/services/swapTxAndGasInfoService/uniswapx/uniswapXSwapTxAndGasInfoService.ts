import { SwapTxAndGasInfoService } from 'uniswap/src/features/transactions/swap/review/services/swapTxAndGasInfoService/swapTxAndGasInfoService'
import {
  getLXSwapTxAndGasInfo,
  processLXResponse,
} from 'uniswap/src/features/transactions/swap/review/services/swapTxAndGasInfoService/uniswapx/utils'
import { LXTrade } from 'uniswap/src/features/transactions/swap/types/trade'

export function createLXSwapTxAndGasInfoService(): SwapTxAndGasInfoService<LXTrade> {
  const service: SwapTxAndGasInfoService<LXTrade> = {
    async getSwapTxAndGasInfo(params) {
      const permitData = params.trade.quote.permitData

      const swapTxInfo = processLXResponse({ permitData })
      return getLXSwapTxAndGasInfo({ ...params, swapTxInfo })
    },
  }

  return service
}
