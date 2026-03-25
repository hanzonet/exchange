import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TransactionSummaryLayout } from '@luxexchange/lx/src/components/activity/summaries/TransactionSummaryLayout'
import { SummaryItemProps } from '@luxexchange/lx/src/components/activity/types'
import { formatApprovalAmount, TXN_HISTORY_ICON_SIZE } from '@luxexchange/lx/src/components/activity/utils'
import { LogoWithTxStatus } from '@luxexchange/lx/src/components/CurrencyLogo/LogoWithTxStatus'
import { AssetType } from '@luxexchange/lx/src/entities/assets'
import { useLocalizationContext } from '@luxexchange/lx/src/features/language/LocalizationContext'
import { useCurrencyInfo } from '@luxexchange/lx/src/features/tokens/useCurrencyInfo'
import {
  ApproveTransactionInfo,
  TransactionDetails,
  TransactionType,
} from '@luxexchange/lx/src/features/transactions/types/transactionDetails'
import { getSymbolDisplayText } from '@luxexchange/lx/src/utils/currency'
import { buildCurrencyId } from '@luxexchange/lx/src/utils/currencyId'

export function ApproveSummaryItem({
  transaction,
  index,
  isExternalProfile,
}: SummaryItemProps & {
  transaction: TransactionDetails & { typeInfo: ApproveTransactionInfo }
}): JSX.Element {
  const { t } = useTranslation()
  const { formatNumberOrString } = useLocalizationContext()
  const currencyInfo = useCurrencyInfo(buildCurrencyId(transaction.chainId, transaction.typeInfo.tokenAddress))

  const { approvalAmount } = transaction.typeInfo

  const amount = formatApprovalAmount({
    approvalAmount,
    formatNumberOrString,
    t,
  })

  const caption = `${amount ? amount + ' ' : ''}${getSymbolDisplayText(currencyInfo?.currency.symbol) ?? ''}`

  const icon = useMemo(
    () => (
      <LogoWithTxStatus
        assetType={AssetType.Currency}
        chainId={transaction.chainId}
        currencyInfo={currencyInfo}
        size={TXN_HISTORY_ICON_SIZE}
        txStatus={transaction.status}
        txType={TransactionType.Approve}
      />
    ),
    [currencyInfo, transaction.chainId, transaction.status],
  )

  return (
    <TransactionSummaryLayout
      caption={caption}
      icon={icon}
      index={index}
      transaction={transaction}
      isExternalProfile={isExternalProfile}
    />
  )
}
