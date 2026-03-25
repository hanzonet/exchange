import { useDispatch } from 'react-redux'
import { type UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { setActiveChainId } from '@luxexchange/lx/src/features/smartWallet/delegation/slice'
import { useEvent } from '@luxfi/utilities/src/react/hooks'

export function useSetActiveChainId(): (chainId?: UniverseChainId) => void {
  const dispatch = useDispatch()
  return useEvent((chainId?: UniverseChainId) => {
    dispatch(setActiveChainId({ chainId }))
  })
}
