import { FeatureFlags, useFeatureFlag } from '@universe/gating'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { useLXPriorityOrderFlag } from 'uniswap/src/features/transactions/swap/utils/protocols'

/**
 * Returns true if the chain is supported by LX. Does not differentiate between LX v1 and v2.
 */
export function useIsLXSupportedChain(chainId?: number) {
  const isDutchV3Enabled = useFeatureFlag(FeatureFlags.ArbitrumDutchV3)
  const isPriorityOrdersEnabled = useLXPriorityOrderFlag(chainId)

  return (
    chainId === UniverseChainId.Mainnet ||
    (isDutchV3Enabled && chainId === UniverseChainId.ArbitrumOne) ||
    isPriorityOrdersEnabled
  )
}
