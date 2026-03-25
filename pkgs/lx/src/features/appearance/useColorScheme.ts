import { type ColorScheme } from '@luxexchange/lx/src/features/appearance/types'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export const useColorScheme = (): ColorScheme => {
  throw new PlatformSplitStubError('Use the correct hook for your platform')
}
