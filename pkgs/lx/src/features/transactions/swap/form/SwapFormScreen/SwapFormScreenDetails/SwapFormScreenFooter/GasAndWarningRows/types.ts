import { FormattedDEXGasFeeInfo, GasFeeResult } from '@luxexchange/api'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'

export type GasInfo = {
  gasFee: GasFeeResult
  fiatPriceFormatted?: string
  dexGasFeeInfo?: FormattedDEXGasFeeInfo
  isHighRelativeToValue: boolean
  isLoading: boolean
  chainId: UniverseChainId
}
