import { createComplianceApiClient } from '@luxexchange/api'
import { uniswapUrls } from 'uniswap/src/constants/urls'

export const ComplianceApiClient = createComplianceApiClient({
  baseUrl: uniswapUrls.complianceApiBaseUrl,
})
