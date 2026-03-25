import { createComplianceApiClient } from '@luxexchange/api'
import { luxUrls } from 'uniswap/src/constants/urls'

export const ComplianceApiClient = createComplianceApiClient({
  baseUrl: luxUrls.complianceApiBaseUrl,
})
