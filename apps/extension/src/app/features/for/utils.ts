import { SharedEventName } from '@luxdex/analytics-events'
import { useDappContext } from 'src/app/features/dapp/DappContext'
import { useDappLastChainId } from 'src/app/features/dapp/hooks'
import { focusOrCreateLuxInterfaceTab } from 'src/app/navigation/utils'
<<<<<<< Updated upstream
import { luxUrls } from 'lx/src/constants/urls'
import { getChainInfo } from 'lx/src/features/chains/chainInfo'
import { UniverseChainId } from 'lx/src/features/chains/types'
import { ElementName } from 'lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from 'lx/src/features/telemetry/send'
import { ExtensionScreens } from 'lx/src/types/screens/extension'
import { logger } from 'utilities/src/logger/logger'
=======
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { getChainInfo } from '@luxexchange/lx/src/features/chains/chainInfo'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { ElementName } from '@luxexchange/lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from '@luxexchange/lx/src/features/telemetry/send'
import { ExtensionScreens } from '@luxexchange/lx/src/types/screens/extension'
import { logger } from '@luxfi/utilities/src/logger/logger'
>>>>>>> Stashed changes

export function useInterfaceBuyNavigator(element?: ElementName): () => void {
  const { dappUrl } = useDappContext()
  const dappChain = useDappLastChainId(dappUrl)

  return () => {
    sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
      screen: ExtensionScreens.Home,
      element,
    })
    navigateToInterfaceFiatOnRamp(dappChain)
  }
}

export function navigateToInterfaceFiatOnRamp(chainId?: UniverseChainId): void {
  const chainParam = chainId ? `?chain=${getChainInfo(chainId).urlParam}` : ''
  focusOrCreateLuxInterfaceTab({
    url: `${luxUrls.webInterfaceBuyUrl}${chainParam}`,
  }).catch((err) =>
    logger.error(err, {
      tags: {
        file: 'utils',
        function: 'redirectToInterfaceFiatOnRamp',
      },
    }),
  )
}
