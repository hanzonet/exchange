import { createFetchClient, createTradingApiClient, getEntryGatewayUrl, provideSessionService } from '@luxexchange/api'
import type { PlanEndpoints } from '@luxexchange/api/src/clients/trading/createTradingApiClient'
import { reinitializeSession } from '@luxexchange/api/src/components/ApiInit'
import { createWithSessionRetry } from '@luxexchange/api/src/session/createWithSessionRetry'
import { getConfig } from '@luxexchange/config'
import { FeatureFlags, getFeatureFlag } from '@luxexchange/gating'
import { BASE_LUX_HEADERS } from '@luxexchange/lx/src/data/apiClients/createLuxFetchClient'
import { getFeatureFlaggedHeaders } from '@luxexchange/lx/src/data/apiClients/tradingApi/TradingApiClient'
import { logger } from '@luxfi/utilities/src/logger/logger'

function getHeaders(): HeadersInit {
  // Use API key auth instead of session auth, if the flag is enabled.
  if (getFeatureFlag(FeatureFlags.DisableSessionsForPlan)) {
    return {
      ...BASE_LUX_HEADERS,
      'x-api-key': getConfig().tradingApiKey,
    }
  }
  return BASE_LUX_HEADERS
}

const withSessionRetry = createWithSessionRetry({
  reinitializeSession: () => {
    if (getFeatureFlag(FeatureFlags.DisableSessionsForPlan)) {
      return Promise.resolve() // API key auth — session re-init won't help
    }
    logger.warn('TradingApiSessionClient', 'reinitializeSession', 'Reinitializing session during plan')
    return reinitializeSession()
  },
  onReinitializationFailed: () => {
    logger.warn('TradingApiSessionClient', 'onReinitializationFailed', 'Reinitialization failed during plan')
  },
})

const entryGatewayTradingFetchClientWithSession = createFetchClient({
  getBaseUrl: getEntryGatewayUrl,
  getHeaders,
  getSessionService: () =>
    provideSessionService({
      getBaseUrl: getEntryGatewayUrl,
      // Sessions are currently required for plans, so this is enabled by default. The flag exists as a safety net to disable sessions for plan if needed.
      getIsSessionServiceEnabled: () => !getFeatureFlag(FeatureFlags.DisableSessionsForPlan),
    }),
  defaultOptions: {
    credentials: 'include',
  },
})

const BaseTradingApiSessionClient: PlanEndpoints = createTradingApiClient({
  fetchClient: entryGatewayTradingFetchClientWithSession,
  getFeatureFlagHeaders: getFeatureFlaggedHeaders,
  getApiPathPrefix: () => '',
})

const TradingApiSessionClientWithRetry: PlanEndpoints = {
  createNewPlan(params) {
    return withSessionRetry(() => BaseTradingApiSessionClient.createNewPlan(params))
  },
  fetchPlan(params) {
    return withSessionRetry(() => BaseTradingApiSessionClient.fetchPlan(params))
  },
  updateExistingPlan(params) {
    return withSessionRetry(() => BaseTradingApiSessionClient.updateExistingPlan(params))
  },
  getExistingPlan(params) {
    return withSessionRetry(() => BaseTradingApiSessionClient.getExistingPlan(params))
  },
  refreshExistingPlan(params) {
    return withSessionRetry(() => BaseTradingApiSessionClient.refreshExistingPlan(params))
  },
}

export const TradingApiSessionClient: PlanEndpoints = TradingApiSessionClientWithRetry
