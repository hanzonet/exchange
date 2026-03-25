import { TradingApi } from '@luxexchange/api'
import { FeatureFlags, getFeatureFlag, useFeatureFlag } from '@luxexchange/gating'
import { useMemo } from 'react'
import { useLuxContextSelector } from 'uniswap/src/contexts/LuxContext'
import { createGetSupportedChainId } from 'uniswap/src/features/chains/hooks/useSupportedChainId'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { createGetV4SwapEnabled, useV4SwapEnabled } from 'uniswap/src/features/transactions/swap/hooks/useV4SwapEnabled'

export const DEFAULT_PROTOCOL_OPTIONS = [
  // `as const` allows us to derive a type narrower than ProtocolItems, and the `...` spread removes readonly, allowing DEFAULT_PROTOCOL_OPTIONS to be passed around as an argument without `readonly`
  ...([
    TradingApi.ProtocolItems.UNISWAPX_V2,
    TradingApi.ProtocolItems.V4,
    TradingApi.ProtocolItems.V3,
    TradingApi.ProtocolItems.V2,
  ] as const),
]
export type FrontendSupportedProtocol = (typeof DEFAULT_PROTOCOL_OPTIONS)[number]

const LAUNCHED_UNISWAPX_CHAINS = [UniverseChainId.Mainnet]

/** Given a list of `userSelectedProtocols`, returns protocol items that are allowed for the given chain. */
export function useProtocolsForChain(
  userSelectedProtocols: FrontendSupportedProtocol[],
  chainId?: UniverseChainId,
): TradingApi.ProtocolItems[] {
  const getIsLXSupported = useLuxContextSelector((state) => state.getIsLXSupported)
  const uniswapXEnabled = useFeatureFlag(FeatureFlags.LX)
  const priorityOrdersAllowed = useLXPriorityOrderFlag(chainId)
  const isDutchV3Enabled = useFeatureFlag(FeatureFlags.ArbitrumDutchV3)
  const v4SwapAllowed = useV4SwapEnabled(chainId)

  const protocolFilter = useMemo(
    () =>
      createProtocolFilter({
        getLXEnabled: () => uniswapXEnabled,
        getIsLXSupported,
        getPriorityOrderFlag: () => priorityOrdersAllowed,
        getV4Enabled: () => v4SwapAllowed,
        getArbitrumDutchV3Enabled: () => isDutchV3Enabled,
      }),
    [uniswapXEnabled, priorityOrdersAllowed, isDutchV3Enabled, v4SwapAllowed, getIsLXSupported],
  )

  return useMemo(() => {
    return protocolFilter(userSelectedProtocols, chainId)
  }, [protocolFilter, userSelectedProtocols, chainId])
}

export function createProtocolFilter(ctx: {
  getLXEnabled: () => boolean
  getIsLXSupported?: (chainId?: UniverseChainId) => boolean
  getPriorityOrderFlag: (chainId?: UniverseChainId) => boolean
  getV4Enabled: (chainId?: UniverseChainId) => boolean
  getArbitrumDutchV3Enabled: () => boolean
}) {
  return function filterProtocols(
    protocols: FrontendSupportedProtocol[],
    chainId?: UniverseChainId,
  ): TradingApi.ProtocolItems[] {
    const uniswapXEnabled = ctx.getLXEnabled()
    const uniswapXSupportedForChain = ctx.getIsLXSupported ? ctx.getIsLXSupported(chainId) : true
    const combinedLXEnabled = uniswapXEnabled && uniswapXSupportedForChain

    const priorityOrdersAllowed = ctx.getPriorityOrderFlag(chainId)
    const arbDutchV3Enabled = chainId === UniverseChainId.ArbitrumOne && ctx.getArbitrumDutchV3Enabled()
    const v4Enabled = ctx.getV4Enabled(chainId)

    const uniswapXAllowedForChain =
      (chainId && LAUNCHED_UNISWAPX_CHAINS.includes(chainId)) || priorityOrdersAllowed || arbDutchV3Enabled

    let filteredProtocols: TradingApi.ProtocolItems[] = [...protocols]

    // Remove LX from the options we send to TradingAPI if LX hasn't been launched or isn't in experiment on that chain
    if (!uniswapXAllowedForChain || !combinedLXEnabled) {
      filteredProtocols = filteredProtocols.filter((protocol) => protocol !== TradingApi.ProtocolItems.UNISWAPX_V2)
    }

    // Replace LXV2 with V3 if V3 experiment is enabled on arbitrum
    if (arbDutchV3Enabled) {
      filteredProtocols = filteredProtocols.map((protocol) =>
        protocol === TradingApi.ProtocolItems.UNISWAPX_V2 ? TradingApi.ProtocolItems.UNISWAPX_V3 : protocol,
      )
    }

    if (!v4Enabled) {
      filteredProtocols = filteredProtocols.filter((protocol) => protocol !== TradingApi.ProtocolItems.V4)
    }

    return filteredProtocols
  }
}

export function useLXPriorityOrderFlag(chainId?: UniverseChainId): boolean {
  if (!chainId) {
    return false
  }

  return getLXPriorityOrderFlag(chainId)
}

export function createGetProtocolsForChain(ctx: {
  // these need to come from react unfortunately
  getIsLXSupported?: (chainId?: UniverseChainId) => boolean
  getEnabledChains: () => UniverseChainId[]
}): (userSelectedProtocols: FrontendSupportedProtocol[], chainId?: UniverseChainId) => TradingApi.ProtocolItems[] {
  const uniswapXEnabled = getFeatureFlag(FeatureFlags.LX)
  const isDutchV3Enabled = getFeatureFlag(FeatureFlags.ArbitrumDutchV3)

  const getV4SwapAllowed = createGetV4SwapEnabled({
    getSupportedChainId: createGetSupportedChainId({
      getChains: () => ctx.getEnabledChains(),
    }).getSupportedChainId,
  })

  const getProtocolsForChain = createProtocolFilter({
    getLXEnabled: () => uniswapXEnabled,
    getIsLXSupported: ctx.getIsLXSupported,
    getPriorityOrderFlag: getLXPriorityOrderFlag,
    getV4Enabled: getV4SwapAllowed,
    getArbitrumDutchV3Enabled: () => isDutchV3Enabled,
  })

  return getProtocolsForChain
}

export function createGetLXPriorityOrderFlag(ctx: {
  getFeatureFlag: (flagName: FeatureFlags) => boolean
}): (chainId?: UniverseChainId) => boolean {
  return (chainId?: UniverseChainId) => {
    if (!chainId) {
      return false
    }

    switch (chainId) {
      case UniverseChainId.Base:
        return ctx.getFeatureFlag(FeatureFlags.LXPriorityOrdersBase)
      case UniverseChainId.Optimism:
        return ctx.getFeatureFlag(FeatureFlags.LXPriorityOrdersOptimism)
      case UniverseChainId.Unichain:
        return ctx.getFeatureFlag(FeatureFlags.LXPriorityOrdersUnichain)
      default:
        return false
    }
  }
}

export const getLXPriorityOrderFlag = createGetLXPriorityOrderFlag({
  getFeatureFlag,
})
