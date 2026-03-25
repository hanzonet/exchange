import ReactNativeIdfaAaid from '@sparkfabrik/react-native-idfa-aaid'
import { ANONYMOUS_DEVICE_ID, OriginApplication } from '@luxdex/analytics'
import DeviceInfo from 'react-native-device-info'
import { call, delay, fork, select } from 'typed-redux-saga'
<<<<<<< Updated upstream
import { luxUrls } from 'lx/src/constants/urls'
import { MobileUserPropertyName } from 'lx/src/features/telemetry/user'
import { getUniqueId } from 'utilities/src/device/uniqueId'
import { isTestEnv } from 'utilities/src/environment/env'
import { logger } from 'utilities/src/logger/logger'
import { isAndroid } from 'utilities/src/platform'
import { ApplicationTransport } from 'utilities/src/telemetry/analytics/ApplicationTransport'
=======
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { MobileUserPropertyName } from '@luxexchange/lx/src/features/telemetry/user'
import { getUniqueId } from '@luxfi/utilities/src/device/uniqueId'
import { isTestEnv } from '@luxfi/utilities/src/environment/env'
import { logger } from '@luxfi/utilities/src/logger/logger'
import { isAndroid } from '@luxfi/utilities/src/platform'
import { ApplicationTransport } from '@luxfi/utilities/src/telemetry/analytics/ApplicationTransport'
>>>>>>> Stashed changes
// biome-ignore lint/style/noRestrictedImports: Required for analytics initialization
import { analytics } from 'utilities/src/telemetry/analytics/analytics'
import { selectAllowAnalytics } from 'wallet/src/features/telemetry/selectors'
import { watchTransactionEvents } from 'wallet/src/features/transactions/watcher/transactionFinalizationSaga'

export function* telemetrySaga() {
  if (isTestEnv()) {
    logger.debug('telemetry/saga.ts', 'telemetrySaga', 'Skipping Amplitude initialization in test environment')
  } else {
    yield* delay(1)

    const allowAnalytics = yield* select(selectAllowAnalytics)

    yield* call(analytics.init, {
      transportProvider: new ApplicationTransport({
        serverUrl: luxUrls.amplitudeProxyUrl,
        appOrigin: OriginApplication.MOBILE,
        originOverride: luxUrls.apiOrigin,
        appBuild: DeviceInfo.getBundleId(),
      }),
      allowed: allowAnalytics,
      userIdGetter: getUniqueId,
    })

    if (isAndroid) {
      // Only need GAID, not using IDFA
      const advertisingInfoResponse = yield* call(ReactNativeIdfaAaid.getAdvertisingInfo)
      const adTrackingAllowed = allowAnalytics && !advertisingInfoResponse.isAdTrackingLimited
      if (adTrackingAllowed) {
        yield* call(
          analytics.setUserProperty,
          MobileUserPropertyName.AdvertisingId,
          advertisingInfoResponse.id ? advertisingInfoResponse.id : ANONYMOUS_DEVICE_ID,
        )
      }
    }
  }

  yield* fork(watchTransactionEvents)
}
