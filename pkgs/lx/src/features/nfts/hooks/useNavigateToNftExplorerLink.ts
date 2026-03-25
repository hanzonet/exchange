import { NavigateToNftItemArgs } from '@luxexchange/lx/src/contexts/LuxContext'
import { getNftExplorerLink, openUri } from '@luxexchange/lx/src/utils/linking'
import { useEvent } from '@luxfi/utilities/src/react/hooks'

export function useNavigateToNftExplorerLink(): (args: NavigateToNftItemArgs) => void {
  return useEvent((args: NavigateToNftItemArgs): Promise<void> => openUri({ uri: getNftExplorerLink(args) }))
}
