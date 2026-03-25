import { Platform } from '@luxexchange/lx/src/features/platforms/types/Platform'
import type { TransactionSettingConfig } from '@luxexchange/lx/src/features/transactions/components/settings/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export const SlippageUpdate: TransactionSettingConfig = {
  renderTitle: (t) => t('swap.slippage.settings.title'),
  applicablePlatforms: [Platform.EVM, Platform.SVM],
  Control() {
    throw new PlatformSplitStubError('Slippage')
  },
}
