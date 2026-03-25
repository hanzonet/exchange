import type { DialogProps } from '@luxexchange/lx/src/components/dialog/DialogProps'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

/**
 * A dialog component that renders platform-specific implementations.
 * Web/extension: Modal dialog
 * Native: To be implemented
 */
export function Dialog(_: DialogProps): JSX.Element {
  throw new PlatformSplitStubError('Dialog')
}
