import type { SlippageControlProps } from '@luxexchange/lx/src/features/transactions/components/settings/settingsConfigurations/slippage/SlippageControl/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

/**
 * Base implementation of the slippage setting control.
 * For the swap-specific implementation, see SwapFormSettings.
 */
export function SlippageControl(_props: SlippageControlProps): JSX.Element {
  throw new PlatformSplitStubError('SlippageControl')
}
