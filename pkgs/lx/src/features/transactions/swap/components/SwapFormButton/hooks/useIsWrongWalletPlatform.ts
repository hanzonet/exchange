import { useActiveAccount, useConnectionStatus } from '@luxexchange/lx/src/features/accounts/store/hooks'
import { Platform } from '@luxexchange/lx/src/features/platforms/types/Platform'
import { chainIdToPlatform } from '@luxexchange/lx/src/features/platforms/utils/chains'
import { useSwapFormStoreDerivedSwapInfo } from '@luxexchange/lx/src/features/transactions/swap/stores/swapFormStore/useSwapFormStore'

export function useIsWrongWalletPlatform(): { isWrongWalletPlatform: boolean; expectedPlatform: Platform | undefined } {
  const chainId = useSwapFormStoreDerivedSwapInfo((s) => s.chainId)
  const activeAccount = useActiveAccount(chainId)
  const { isConnected } = useConnectionStatus()

  return {
    isWrongWalletPlatform: Boolean(isConnected && activeAccount === undefined),
    expectedPlatform: chainIdToPlatform(chainId),
  }
}
