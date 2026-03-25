import { Platform } from '@luxexchange/lx/src/features/platforms/types/Platform'
import type { TransactionSettingConfig } from '@luxexchange/lx/src/features/transactions/components/settings/types'
import { RoutingMethodPreferenceControl } from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormSettings/settingsConfigurations/RoutingMethodPreference/RoutingMethodPreferenceControl'
import { RoutingMethodPreferenceScreen } from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormSettings/settingsConfigurations/RoutingMethodPreference/RoutingMethodPreferenceScreen'

export const RoutingMethodPreference: TransactionSettingConfig = {
  renderTitle: (t) => t('swap.settings.routingMethod.title'),
  applicablePlatforms: [Platform.EVM],
  Control() {
    return <RoutingMethodPreferenceControl />
  },
  Screen() {
    return <RoutingMethodPreferenceScreen />
  },
}
