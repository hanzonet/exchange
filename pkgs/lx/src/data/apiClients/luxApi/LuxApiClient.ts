import { createLuxApiClient, type GasFeeResponse, type GasStrategy } from '@luxexchange/api'
import { config } from '@luxexchange/lx/src/config'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { createLuxFetchClient } from '@luxexchange/lx/src/data/apiClients/createLuxFetchClient'
import { convertGasFeeToDisplayValue } from '@luxexchange/lx/src/features/gas/hooks'
import { estimateGasWithClientSideProvider, extractGasFeeParams } from '@luxexchange/lx/src/features/gas/utils'
import { isWebApp } from '@luxfi/utilities/src/platform'

const LuxFetchClient = createLuxFetchClient({
  baseUrl: luxUrls.apiBaseUrl,
  additionalHeaders: {
    'x-api-key': config.luxApiKey,
  },
  includeBaseLuxHeaders: !isWebApp,
})

export const LuxApiClient = createLuxApiClient({
  fetchClient: LuxFetchClient,
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
