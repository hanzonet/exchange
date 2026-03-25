import type { SvgImageProps } from '@luxfi/ui/src/components/UniversalImage/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function SvgImage(_props: SvgImageProps): JSX.Element | null {
  throw new PlatformSplitStubError('SvgImage')
}
