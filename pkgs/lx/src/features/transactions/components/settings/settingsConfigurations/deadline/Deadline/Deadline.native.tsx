import { Platform } from '@luxexchange/lx/src/features/platforms/types/Platform'
import type { TransactionSettingConfig } from '@luxexchange/lx/src/features/transactions/components/settings/types'
import { NotImplementedError } from '@luxfi/utilities/src/errors'

export const Deadline: TransactionSettingConfig = {
  applicablePlatforms: [Platform.EVM],
  renderTitle: () => {
    throw new NotImplementedError('Deadline > renderTitle')
  },
  Control() {
    throw new NotImplementedError('Deadline > Control')
  },
  Warning() {
    throw new NotImplementedError('Deadline > Warning')
  },
}
