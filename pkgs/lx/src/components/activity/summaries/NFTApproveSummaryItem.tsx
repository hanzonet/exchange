import { NFTSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/NFTSummaryItem'
import { SummaryItemProps } from '@luxexchange/lx/src/components/activity/types'
import {
  NFTApproveTransactionInfo,
  TransactionDetails,
  TransactionType,
} from '@luxexchange/lx/src/features/transactions/types/transactionDetails'

export function NFTApproveSummaryItem({
  transaction,
  index,
  isExternalProfile,
}: SummaryItemProps & {
  transaction: TransactionDetails & { typeInfo: NFTApproveTransactionInfo }
}): JSX.Element {
  return (
    <NFTSummaryItem
      index={index}
      transaction={transaction}
      transactionType={TransactionType.NFTApprove}
      isExternalProfile={isExternalProfile}
    />
  )
}
