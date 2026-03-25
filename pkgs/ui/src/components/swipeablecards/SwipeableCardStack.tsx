import type { SwipeableCardStackProps } from '@luxfi/ui/src/components/swipeablecards/props'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function SwipeableCardStack<T>(_props: SwipeableCardStackProps<T>): JSX.Element {
  throw new PlatformSplitStubError('SwipeableCardStack')
}
