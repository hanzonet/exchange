import { AlertTriangleFilled, CheckmarkCircle } from '@luxfi/ui/src/components/icons'
import { LogoWithTxStatus } from '@luxexchange/lx/src/components/CurrencyLogo/LogoWithTxStatus'
import { NotificationToast } from '@luxexchange/lx/src/components/notifications/NotificationToast'
import { AssetType } from '@luxexchange/lx/src/entities/assets'
import { useENS } from '@luxexchange/lx/src/features/ens/useENS'
import { NOTIFICATION_ICON_SIZE } from '@luxexchange/lx/src/features/notifications/constants'
import { TransactionNotificationBase } from '@luxexchange/lx/src/features/notifications/slice/types'
import { useCurrencyInfo } from '@luxexchange/lx/src/features/tokens/useCurrencyInfo'
import { TransactionStatus } from '@luxexchange/lx/src/features/transactions/types/transactionDetails'
import { buildCurrencyId } from '@luxexchange/lx/src/utils/currencyId'
import { useWalletNavigation } from '@luxfi/wallet/src/contexts/WalletNavigationContext'
import { formUnknownTxTitle } from '@luxfi/wallet/src/features/notifications/utils'

export function UnknownTxNotification({
  notification: { address, chainId, tokenAddress, txStatus, txType, hideDelay },
}: {
  notification: TransactionNotificationBase
}): JSX.Element {
  const { name: ensName } = useENS({ nameOrAddress: tokenAddress, chainId })
  const currencyInfo = useCurrencyInfo(tokenAddress ? buildCurrencyId(chainId, tokenAddress) : undefined)
  const title = formUnknownTxTitle({ txStatus, tokenAddress, ensName })
  const icon = currencyInfo ? (
    <LogoWithTxStatus
      assetType={AssetType.Currency}
      chainId={chainId}
      currencyInfo={currencyInfo}
      size={NOTIFICATION_ICON_SIZE}
      txStatus={txStatus}
      txType={txType}
    />
  ) : txStatus === TransactionStatus.Success ? (
    <CheckmarkCircle size="$icon.24" />
  ) : (
    <AlertTriangleFilled color="$statusCritical" size="$icon.24" />
  )

  const { navigateToAccountActivityList } = useWalletNavigation()

  return (
    <NotificationToast
      address={address}
      hideDelay={hideDelay}
      icon={icon}
      title={title}
      onPress={navigateToAccountActivityList}
    />
  )
}
