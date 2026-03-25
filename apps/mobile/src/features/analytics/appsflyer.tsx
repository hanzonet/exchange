import appsFlyer from 'react-native-appsflyer'
<<<<<<< Updated upstream
import { config } from 'lx/src/config'
import { isBetaEnv, isDevEnv } from 'utilities/src/environment/env'
import { logger } from 'utilities/src/logger/logger'
=======
import { config } from '@luxexchange/lx/src/config'
import { isBetaEnv, isDevEnv } from '@luxfi/utilities/src/environment/env'
import { logger } from '@luxfi/utilities/src/logger/logger'
>>>>>>> Stashed changes

export function initAppsFlyer(): void {
  appsFlyer.initSdk(
    {
      devKey: config.appsflyerApiKey,
      isDebug: isDevEnv() || isBetaEnv(),
      appId: config.appsflyerAppId,
      onInstallConversionDataListener: false,
      onDeepLinkListener: false,
      timeToWaitForATTUserAuthorization: 10,
      // Ensures we have to manually start the SDK to respect any opting out
      manualStart: true,
    },
    (result) => {
      logger.debug('appsflyer', 'initAppsFlyer', 'Result:', result)
    },
    (error) => {
      logger.error(error, { tags: { file: 'appsflyer', function: 'initAppsFlyer' } })
    },
  )
}
