import type { TokenOptionItemProps } from '@luxexchange/lx/src/components/CurrencyInputPanel/DefaultTokenOptions/TokenOptions/TokenOptionItem/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export const TokenOptionItem = (_props: TokenOptionItemProps): JSX.Element => {
  throw new PlatformSplitStubError('TokenOptionItem')
}
