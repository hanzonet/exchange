import { createConnectTransportWithDefaults } from '@luxexchange/api'
import { config } from '@luxexchange/lx/src/config'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'

export const liquidityServiceTransport = createConnectTransportWithDefaults(
  {
    baseUrl: luxUrls.liquidityServiceUrl,
    additionalHeaders: {
      'x-api-key': config.tradingApiKey,
    },
  },
  {
    jsonOptions: {
      // Ensure boolean false values and other default values are included in JSON serialization
      // Required for fields like BidToExit.isExited which need to be sent even when false
      emitDefaultValues: true,
    },
  },
)
