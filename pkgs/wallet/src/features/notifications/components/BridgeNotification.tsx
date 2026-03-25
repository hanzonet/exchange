import { useTranslation } from 'react-i18next'
import { Flex, Text } from '@luxfi/ui/src'
import { iconSizes } from '@luxfi/ui/src/theme'
import { CrossChainIcon, SplitLogo } from '@luxexchange/lx/src/components/CurrencyLogo/SplitLogo'
import { NotificationToast } from '@luxexchange/lx/src/components/notifications/NotificationToast'
import { useLocalizationContext } from '@luxexchange/lx/src/features/language/LocalizationContext'
import { BridgeTxNotification, PlanTxNotification } from '@luxexchange/lx/src/features/notifications/slice/types'
import { useCurrencyInfo } from '@luxexchange/lx/src/features/tokens/useCurrencyInfo'
import { CrossChainCurrencyRow } from '@luxexchange/lx/src/features/transactions/swap/components/CrossChainCurrencyRow'
import { TransactionStatus } from '@luxexchange/lx/src/features/transactions/types/transactionDetails'
import { getFormattedCurrencyAmount } from '@luxexchange/lx/src/utils/currency'
import { useWalletNavigation } from '@luxfi/wallet/src/contexts/WalletNavigationContext'
import { formBridgeNotificationTitle } from '@luxfi/wallet/src/features/notifications/utils'
import { useCreateSwapFormState } from '@luxfi/wallet/src/features/transactions/hooks/useCreateSwapFormState'

export function CrossChainNotification({
  notification,
}: {
  notification: BridgeTxNotification | PlanTxNotification
}): JSX.Element {
  const { t } = useTranslation()
  const formatter = useLocalizationContext()
  const { navigateToAccountActivityList, navigateToSwapFlow } = useWalletNavigation()

  const {
    chainId,
    txId,
    txStatus,
    inputCurrencyId,
    inputCurrencyAmountRaw,
    outputCurrencyId,
    outputCurrencyAmountRaw,
    address,
    hideDelay,
  } = notification

  const inputCurrencyInfo = useCurrencyInfo(inputCurrencyId)
  const outputCurrencyInfo = useCurrencyInfo(outputCurrencyId)

  const title = formBridgeNotificationTitle(txStatus)
  const swapFormState = useCreateSwapFormState({ address, chainId, txId })

  const onRetry = (): void => {
    navigateToSwapFlow(swapFormState ? { initialState: swapFormState } : undefined)
  }

  const retryButton =
    txStatus === TransactionStatus.Failed
      ? {
          title: t('common.button.retry'),
          onPress: onRetry,
        }
      : undefined

  const formattedInputTokenAmount = getFormattedCurrencyAmount({
    currency: inputCurrencyInfo?.currency,
    amount: inputCurrencyAmountRaw,
    formatter,
  })

  const formattedOutputTokenAmount = getFormattedCurrencyAmount({
    currency: outputCurrencyInfo?.currency,
    amount: outputCurrencyAmountRaw,
    formatter,
  })

  const contentOverride = (
    <Flex grow row gap="$spacing12" alignItems="center" width="100%">
      <Flex centered>
        <SplitLogo
          chainId={chainId}
          inputCurrencyInfo={inputCurrencyInfo}
          outputCurrencyInfo={outputCurrencyInfo}
          size={iconSizes.icon40}
          customIcon={<CrossChainIcon status={txStatus} />}
        />
      </Flex>
      <Flex gap="$spacing4">
        <Text color="$neutral2" variant="body3">
          {title}
        </Text>
        <CrossChainCurrencyRow
          inputChainId={inputCurrencyInfo?.currency.chainId ?? null}
          inputSymbol={inputCurrencyInfo?.currency.symbol ?? ''}
          outputChainId={outputCurrencyInfo?.currency.chainId ?? null}
          outputSymbol={outputCurrencyInfo?.currency.symbol ?? ''}
          formattedInputTokenAmount={formattedInputTokenAmount}
          formattedOutputTokenAmount={formattedOutputTokenAmount}
        />
      </Flex>
    </Flex>
  )

  return (
    <NotificationToast
      actionButton={retryButton}
      address={address}
      hideDelay={hideDelay}
      title={title}
      contentOverride={contentOverride}
      onPress={navigateToAccountActivityList}
    />
  )
}
