import { FlexProps } from '@luxfi/ui/src'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function EdgeFade(_props: { side: 'left' | 'right' } & FlexProps): JSX.Element {
  throw new PlatformSplitStubError('EdgeFade')
}
