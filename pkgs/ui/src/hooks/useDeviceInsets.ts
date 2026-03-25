import type { EdgeInsets } from 'react-native-safe-area-context'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function useDeviceInsets(): EdgeInsets {
  throw new PlatformSplitStubError('useDeviceInsets')
}
