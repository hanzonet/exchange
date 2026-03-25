import { NFTSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/NFTSummaryItem'
import { SummaryItemProps } from '@luxexchange/lx/src/components/activity/types'
import {
  NFTMintTransactionInfo,
  TransactionDetails,
  TransactionType,
} from '@luxexchange/lx/src/features/transactions/types/transactionDetails'

export function NFTMintSummaryItem({
  transaction,
  index,
  isExternalProfile,
}: SummaryItemProps & {
  transaction: TransactionDetails & { typeInfo: NFTMintTransactionInfo }
}): JSX.Element {
  return (
    <NFTSummaryItem
      index={index}
      transaction={transaction}
      transactionType={TransactionType.NFTMint}
      isExternalProfile={isExternalProfile}
    />
  )
}
