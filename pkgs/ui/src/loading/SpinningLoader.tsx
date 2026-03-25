import type { SpinningLoaderProps } from '@luxfi/ui/src/loading/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function SpinningLoader(_props: SpinningLoaderProps): JSX.Element {
  throw new PlatformSplitStubError('SpinningLoader')
}
