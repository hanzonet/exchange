import type { SkeletonProps } from '@luxfi/ui/src/loading/SkeletonProps'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function Skeleton(_props: SkeletonProps): JSX.Element {
  throw new PlatformSplitStubError('Skeleton')
}
