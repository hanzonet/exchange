import { call, select } from 'typed-redux-saga'
import { getFeatureFlaggedChainIds } from '@luxexchange/lx/src/features/chains/hooks/useFeatureFlaggedChainIds'
import { getEnabledChains } from '@luxexchange/lx/src/features/chains/utils'
import { Platform } from '@luxexchange/lx/src/features/platforms/types/Platform'
// biome-ignore lint/style/noRestrictedImports: legacy import will be migrated
import { selectIsTestnetModeEnabled } from '@luxexchange/lx/src/features/settings/selectors'

export function* getEnabledChainIdsSaga(platform?: Platform) {
  const isTestnetModeEnabled = yield* select(selectIsTestnetModeEnabled)

  const featureFlaggedChainIds = yield* call(getFeatureFlaggedChainIds)

  return yield* call(getEnabledChains, {
    platform,
    isTestnetModeEnabled,
    featureFlaggedChainIds,
  })
}
