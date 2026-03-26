import { createComplianceApiClient } from '@luxexchange/api'
import { lxUrls } from 'uniswap/src/constants/urls'

export const ComplianceApiClient = createComplianceApiClient({
  baseUrl: lxUrls.complianceApiBaseUrl,
})
