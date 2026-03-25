import { PreloadedState } from 'redux'
import { ExtensionState } from 'src/store/extensionReducer'
<<<<<<< Updated upstream
import { createFixture } from 'lx/src/test/utils'
import { preloadedWalletPackageState } from 'wallet/src/test/fixtures'
=======
import { createFixture } from '@luxexchange/lx/src/test/utils'
import { preloadedWalletPackageState } from '@luxfi/wallet/src/test/fixtures'
>>>>>>> Stashed changes

type PreloadedExtensionStateOptions = Record<string, never>

type PreloadedExtensionStateFactory = (
  overrides?: Partial<PreloadedState<ExtensionState> & PreloadedExtensionStateOptions>,
) => PreloadedState<ExtensionState>

export const preloadedExtensionState: PreloadedExtensionStateFactory = createFixture<
  PreloadedState<ExtensionState>,
  PreloadedExtensionStateOptions
>({})(() => ({
  ...preloadedWalletPackageState(),
}))
