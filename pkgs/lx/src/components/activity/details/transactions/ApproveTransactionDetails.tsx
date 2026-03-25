import { SharedEventName } from '@luxdex/analytics-events'
import { useTranslation } from 'react-i18next'
import { Flex, Text, TouchableArea } from '@luxfi/ui/src'
import { iconSizes } from '@luxfi/ui/src/theme'
import { formatApprovalAmount } from '@luxexchange/lx/src/components/activity/utils'
import { CurrencyLogo } from '@luxexchange/lx/src/components/CurrencyLogo/CurrencyLogo'
import { useLuxContext } from '@luxexchange/lx/src/contexts/LuxContext'
import { useLocalizationContext } from '@luxexchange/lx/src/features/language/LocalizationContext'
import { ElementName, ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from '@luxexchange/lx/src/features/telemetry/send'
import { useCurrencyInfo } from '@luxexchange/lx/src/features/tokens/useCurrencyInfo'
import {
  ApproveTransactionInfo,
  Permit2ApproveTransactionInfo,
  TransactionDetails,
  TransactionType,
} from '@luxexchange/lx/src/features/transactions/types/transactionDetails'
import { getSymbolDisplayText } from '@luxexchange/lx/src/utils/currency'
import { buildCurrencyId } from '@luxexchange/lx/src/utils/currencyId'
import { isWebPlatform } from '@luxfi/utilities/src/platform'

export function ApproveTransactionDetails({
  transactionDetails,
  typeInfo,
  onClose,
}: {
  transactionDetails: TransactionDetails
  typeInfo: ApproveTransactionInfo | Permit2ApproveTransactionInfo
  onClose: () => void
}): JSX.Element | null {
  const { t } = useTranslation()
  const { formatNumberOrString } = useLocalizationContext()
  const { navigateToTokenDetails } = useLuxContext()
  const currencyInfo = useCurrencyInfo(buildCurrencyId(transactionDetails.chainId, typeInfo.tokenAddress ?? ''))

  if (!currencyInfo && typeInfo.type === TransactionType.Permit2Approve) {
    return null
  }

  const approvalAmount = typeInfo.type === TransactionType.Approve ? typeInfo.approvalAmount : typeInfo.amount

  const amount = formatApprovalAmount({
    approvalAmount,
    formatNumberOrString,
    t,
  })

  const symbol = getSymbolDisplayText(currencyInfo?.currency.symbol)

  const onPressToken = (): void => {
    if (currencyInfo) {
      sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
        element: ElementName.TokenItem,
        modal: ModalName.TransactionDetails,
      })

      navigateToTokenDetails(currencyInfo.currencyId)
      if (!isWebPlatform) {
        onClose()
      }
    }
  }

  return (
    <TouchableArea onPress={onPressToken}>
      <Flex centered gap="$spacing8" p="$spacing32">
        <Text variant="heading3">{amount}</Text>
        <Flex centered row gap="$spacing8">
          <CurrencyLogo currencyInfo={currencyInfo} size={iconSizes.icon20} />
          <Text color="$neutral2" variant="body2">
            {symbol}
          </Text>
        </Flex>
      </Flex>
    </TouchableArea>
  )
}
