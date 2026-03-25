import { checkWalletDelegation } from '@luxexchange/lx/src/data/apiClients/tradingApi/TradingApiClient'
import { createTradingApiDelegationRepository } from '@luxexchange/lx/src/features/smartWallet/delegation/createTradingApiDelegationRepository'
import type { DelegationRepository } from '@luxexchange/lx/src/features/smartWallet/delegation/delegationRepository'
import { getLogger } from '@luxfi/utilities/src/logger/logger'

export function getDelegationRepository(): DelegationRepository {
  return createTradingApiDelegationRepository({
    tradingApiClient: {
      checkWalletDelegation,
    },
    logger: getLogger(),
  })
}
