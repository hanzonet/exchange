import '@hanzogui/core/reset.css'
import 'src/app/Global.css'
import 'symbol-observable' // Needed by `reduxed-chrome-storage` as polyfill, order matters

import { EXTENSION_ORIGIN_APPLICATION } from 'src/app/version'
<<<<<<< Updated upstream
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { getUniqueId } from '@luxfi/utilities/src/device/uniqueId'
import { isTestEnv } from '@luxfi/utilities/src/environment/env'
import { logger } from '@luxfi/utilities/src/logger/logger'
import { ApplicationTransport } from '@luxfi/utilities/src/telemetry/analytics/ApplicationTransport'
=======
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { getUniqueId } from '@luxfi/utilities/src/device/uniqueId'
import { isTestEnv } from '@luxfi/utilities/src/environment/env'
import { logger } from '@luxfi/utilities/src/logger/logger'
import { ApplicationTransport } from '@luxfi/utilities/src/telemetry/analytics/ApplicationTransport'
>>>>>>> Stashed changes
// biome-ignore lint/style/noRestrictedImports: Direct utilities import required for analytics initialization
import { analytics, getAnalyticsAtomDirect } from '@luxfi/utilities/src/telemetry/analytics/analytics'

export async function initExtensionAnalytics(): Promise<void> {
  if (isTestEnv()) {
    logger.debug('analytics.ts', 'initExtensionAnalytics', 'Skipping Amplitude initialization in test environment')
    return
  }

  const analyticsAllowed = await getAnalyticsAtomDirect(true)
  await analytics.init({
    transportProvider: new ApplicationTransport({
      serverUrl: luxUrls.amplitudeProxyUrl,
      appOrigin: EXTENSION_ORIGIN_APPLICATION,
    }),
    allowed: analyticsAllowed,
    userIdGetter: getUniqueId,
  })
}
