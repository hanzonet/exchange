import type React from 'react'
import type { UniconProps } from '@luxfi/ui/src/components/Unicon/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export const Unicon: React.FC<UniconProps> = () => {
  throw new PlatformSplitStubError('Unicon')
}
