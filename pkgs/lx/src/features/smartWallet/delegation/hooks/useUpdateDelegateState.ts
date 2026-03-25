import { useDispatch } from 'react-redux'
import { updateDelegatedState } from '@luxexchange/lx/src/features/smartWallet/delegation/slice'
import { useEvent } from '@luxfi/utilities/src/react/hooks'

export function useUpdateDelegatedState(): (input: { chainId: string; address: string }) => void {
  const dispatch = useDispatch()
  return useEvent((input: { chainId: string; address: string }) => {
    dispatch(updateDelegatedState(input))
  })
}
