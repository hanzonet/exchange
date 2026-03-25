import { getDelegationRepository } from '@luxexchange/lx/src/domains/repositories'
import { createDelegationService, type DelegationService } from '@luxexchange/lx/src/features/smartWallet/delegation/delegation'
import { getLogger } from '@luxfi/utilities/src/logger/logger'

/**
 * Returns a delegation service instance.
 *
 * @param ctx - The context object containing the onDelegationDetected callback.
 * @param ctx.onDelegationDetected - A callback function that is called when a delegation is detected.
 *
 * @returns A delegation service instance.
 */
export function getDelegationService(ctx?: {
  onDelegationDetected?: (input: { chainId: number; address: string }) => void
}): DelegationService {
  return createDelegationService({
    logger: getLogger(),
    delegationRepository: getDelegationRepository(),
    onDelegationDetected: ctx?.onDelegationDetected,
  })
}
