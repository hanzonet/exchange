import type { TransactionSettingConfig } from '@luxexchange/lx/src/features/transactions/components/settings/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function CurrentScreen(_props: {
  settings: TransactionSettingConfig[]
  onSubmitSwap?: () => Promise<void> | void
  tokenColor?: string
}): JSX.Element {
  throw new PlatformSplitStubError('CurrentScreen')
}
