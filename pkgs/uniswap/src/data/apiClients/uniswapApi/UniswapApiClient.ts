import { createLxApiClient, type GasFeeResponse, type GasStrategy } from '@luxexchange/api'
import { config } from 'uniswap/src/config'
import { lxUrls } from 'uniswap/src/constants/urls'
import { createLxFetchClient } from 'uniswap/src/data/apiClients/createLxFetchClient'
import { convertGasFeeToDisplayValue } from 'uniswap/src/features/gas/hooks'
import { estimateGasWithClientSideProvider, extractGasFeeParams } from 'uniswap/src/features/gas/utils'
import { isWebApp } from 'utilities/src/platform'

const LxFetchClient = createLxFetchClient({
  baseUrl: lxUrls.apiBaseUrl,
  additionalHeaders: {
    'x-api-key': config.lxApiKey,
  },
  includeBaseLxHeaders: !isWebApp,
})

export const LxApiClient = createLxApiClient({
  fetchClient: LxFetchClient,
  processGasFeeResponse: (gasFeeResponse: GasFeeResponse, gasStrategy: GasStrategy) => {
    const gasEstimate = gasFeeResponse.gasEstimates[0]
    if (!gasEstimate) {
      throw new Error('Could not get gas estimate')
    }
    return {
      value: gasEstimate.gasFee,
      displayValue: convertGasFeeToDisplayValue(gasEstimate.gasFee, gasStrategy),
      params: extractGasFeeParams(gasEstimate),
      gasEstimate,
    }
  },
  estimateGasWithClientSideProvider,
})
