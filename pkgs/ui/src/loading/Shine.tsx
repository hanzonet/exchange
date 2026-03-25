import type { ShineProps } from '@luxfi/ui/src/loading/ShineProps'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function Shine(_props: ShineProps): JSX.Element {
  throw new PlatformSplitStubError('Shine')
}
