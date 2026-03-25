import { createFetchClient, type FetchClient, provideSessionService } from '@luxexchange/api'
import { getIsSessionServiceEnabled } from '@luxexchange/gating'
import { luxUrls } from 'uniswap/src/constants/urls'
import { getVersionHeader } from 'uniswap/src/data/getVersionHeader'
import { isMobileApp, isWebApp } from 'utilities/src/platform'
import { REQUEST_SOURCE } from 'utilities/src/platform/requestSource'

export const BASE_LUX_HEADERS = {
  'x-request-source': REQUEST_SOURCE,
  ...(!isWebApp ? { 'x-app-version': getVersionHeader() } : {}),
  ...(isMobileApp ? { Origin: luxUrls.apiOrigin } : {}),
}

export function createLuxFetchClient({
  baseUrl,
  includeBaseUniswapHeaders = true,
  additionalHeaders = {},
}: {
  baseUrl: string
  includeBaseUniswapHeaders?: boolean
  additionalHeaders?: HeadersInit & {
    'x-uniquote-enabled'?: string
  }
}): FetchClient {
  const headers = includeBaseUniswapHeaders ? { ...BASE_LUX_HEADERS, ...additionalHeaders } : additionalHeaders

  return createFetchClient({
    baseUrl,
    getHeaders: () => headers,
    getSessionService: () =>
      provideSessionService({ getBaseUrl: () => luxUrls.apiBaseUrlV2, getIsSessionServiceEnabled }),
  })
}
