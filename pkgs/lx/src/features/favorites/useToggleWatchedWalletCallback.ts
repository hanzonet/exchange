import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOnchainDisplayName } from '@luxexchange/lx/src/features/accounts/useOnchainDisplayName'
import { selectWatchedAddressSet } from '@luxexchange/lx/src/features/favorites/selectors'
import { addWatchedAddress, removeWatchedAddress } from '@luxexchange/lx/src/features/favorites/slice'
import { MobileEventName } from '@luxexchange/lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from '@luxexchange/lx/src/features/telemetry/send'

export function useToggleWatchedWalletCallback(address: Address): () => void {
  const dispatch = useDispatch()
  const isFavoriteWallet = useSelector(selectWatchedAddressSet).has(address)
  const displayName = useOnchainDisplayName(address)

  return useCallback(() => {
    if (isFavoriteWallet) {
      dispatch(removeWatchedAddress({ address }))
    } else {
      sendAnalyticsEvent(MobileEventName.FavoriteItem, {
        address,
        type: 'wallet',
        name: displayName?.name,
      })
      dispatch(addWatchedAddress({ address }))
    }
  }, [address, dispatch, displayName?.name, isFavoriteWallet])
}
