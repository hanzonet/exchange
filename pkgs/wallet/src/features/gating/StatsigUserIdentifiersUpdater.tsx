import { useQuery } from '@tanstack/react-query'
import { provideLuxIdentifierService } from '@luxexchange/api'
import { luxIdentifierQuery } from '@luxexchange/sessions'
import { useSyncStatsigUserIdentifiers } from '@luxexchange/lx/src/features/gating/useSyncStatsigUserIdentifiers'
import { useActiveAccountAddress } from '@luxfi/wallet/src/features/wallet/hooks'

/**
 * Component that updates Statsig user with the active wallet address and lux identifier.
 * This enables experiment targeting based on these identifiers.
 *
 * Should be rendered inside a component tree that has access to:
 * - React Query client
 * - Wallet redux store (for active account address)
 * - Statsig provider
 */
export function StatsigUserIdentifiersUpdater(): null {
  const activeAddress = useActiveAccountAddress()
  const { data: luxIdentifier } = useQuery(luxIdentifierQuery(provideLuxIdentifierService))

  useSyncStatsigUserIdentifiers({
    address: activeAddress,
    luxIdentifier,
  })

  return null
}
