import { SharedEventName } from '@luxdex/analytics-events'
import { useCallback } from 'react'
import { useLuxContext } from '@luxexchange/lx/src/contexts/LuxContext'
import { CurrencyInfo } from '@luxexchange/lx/src/features/dataApi/types'
import { ElementName, ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from '@luxexchange/lx/src/features/telemetry/send'
import { isWebPlatform } from '@luxfi/utilities/src/platform'

export function useTokenDetailsNavigation(currency: Maybe<CurrencyInfo>, onClose?: () => void): () => void {
  const { navigateToTokenDetails } = useLuxContext()

  return useCallback(() => {
    if (currency) {
      sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
        element: ElementName.TokenItem,
        modal: ModalName.TransactionDetails,
      })

      navigateToTokenDetails(currency.currencyId)
      if (!isWebPlatform) {
        onClose?.()
      }
    }
  }, [currency, navigateToTokenDetails, onClose])
}
