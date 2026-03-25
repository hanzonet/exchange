import { FormattedLXGasFeeInfo, GasFeeResult } from '@luxexchange/api'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

export type GasInfo = {
  gasFee: GasFeeResult
  fiatPriceFormatted?: string
  uniswapXGasFeeInfo?: FormattedLXGasFeeInfo
  isHighRelativeToValue: boolean
  isLoading: boolean
  chainId: UniverseChainId
}
