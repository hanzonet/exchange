import { NFTSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/NFTSummaryItem'
import { SummaryItemProps } from '@luxexchange/lx/src/components/activity/types'
import { NFTTradeTransactionInfo, TransactionDetails } from '@luxexchange/lx/src/features/transactions/types/transactionDetails'

export function NFTTradeSummaryItem({
  transaction,
  index,
  isExternalProfile,
}: SummaryItemProps & {
  transaction: TransactionDetails & { typeInfo: NFTTradeTransactionInfo }
}): JSX.Element {
  return (
    <NFTSummaryItem
      index={index}
      transaction={transaction}
      transactionType={transaction.typeInfo.type}
      isExternalProfile={isExternalProfile}
    />
  )
}
