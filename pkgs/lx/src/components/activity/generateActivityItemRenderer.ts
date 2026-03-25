import { createElement } from 'react'
import { ApproveSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/ApproveSummaryItem'
import { BridgeSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/BridgeSummaryItem'
import { LiquiditySummaryItem } from '@luxexchange/lx/src/components/activity/summaries/LiquiditySummaryItem'
import { NFTApproveSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/NFTApproveSummaryItem'
import { NFTMintSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/NFTMintSummaryItem'
import { NFTTradeSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/NFTTradeSummaryItem'
import { OffRampTransferSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/OffRampTransferSummaryItem'
import { OnRampTransferSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/OnRampTransferSummaryItem'
import { PlanSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/PlanSummaryItem'
import { ReceiveSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/ReceiveSummaryItem'
import { SendSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/SendSummaryItem'
import { SwapSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/SwapSummaryItem'
import { UnknownSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/UnknownSummaryItem'
import { WCSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/WCSummaryItem'
import { WithdrawSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/WithdrawSummaryItem'
import { WrapSummaryItem } from '@luxexchange/lx/src/components/activity/summaries/WrapSummaryItem'
import { SummaryItemProps, SwapSummaryCallbacks } from '@luxexchange/lx/src/components/activity/types'
import { isLoadingItem, isSectionHeader, LoadingItem, SectionHeader } from '@luxexchange/lx/src/components/activity/utils'
import { TransactionDetails, TransactionType } from '@luxexchange/lx/src/features/transactions/types/transactionDetails'

export type ActivityItem = TransactionDetails | SectionHeader | LoadingItem
export type ActivityItemRenderer = ({ item, index }: { item: ActivityItem; index: number }) => JSX.Element

export function generateActivityItemRenderer({
  loadingItem,
  sectionHeaderElement,
  swapCallbacks,
  isExternalProfile = false,
  authTrigger,
}: {
  loadingItem: JSX.Element
  sectionHeaderElement: React.FunctionComponent<{ title: string; index?: number }>
  swapCallbacks: SwapSummaryCallbacks | undefined
  isExternalProfile?: boolean
  authTrigger: ((args: { successCallback: () => void; failureCallback: () => void }) => Promise<void>) | undefined
}): ActivityItemRenderer {
  // eslint-disable-next-line complexity
  return function ActivityItemComponent({ item, index }: { item: ActivityItem; index: number }): JSX.Element {
    // if it's a loading item, render the loading placeholder
    if (isLoadingItem(item)) {
      return loadingItem
    }
    // if it's a section header, render it differently
    if (isSectionHeader(item)) {
      return createElement(sectionHeaderElement, { title: item.title, key: item.title, index })
    }
    // item is a transaction
    let SummaryItem
    switch (item.typeInfo.type) {
      case TransactionType.Approve:
        SummaryItem = ApproveSummaryItem
        break
      case TransactionType.OnRampPurchase:
      case TransactionType.OnRampTransfer:
        SummaryItem = OnRampTransferSummaryItem
        break
      case TransactionType.OffRampSale:
        SummaryItem = OffRampTransferSummaryItem
        break
      case TransactionType.NFTApprove:
        SummaryItem = NFTApproveSummaryItem
        break
      case TransactionType.NFTMint:
        SummaryItem = NFTMintSummaryItem
        break
      case TransactionType.NFTTrade:
        SummaryItem = NFTTradeSummaryItem
        break
      case TransactionType.Receive:
        SummaryItem = ReceiveSummaryItem
        break
      case TransactionType.Send:
        SummaryItem = SendSummaryItem
        break
      case TransactionType.Bridge:
        SummaryItem = BridgeSummaryItem
        break
      case TransactionType.Swap:
        SummaryItem = SwapSummaryItem
        break
      case TransactionType.Plan:
        SummaryItem = PlanSummaryItem
        break
      case TransactionType.WCConfirm:
        SummaryItem = WCSummaryItem
        break
      case TransactionType.Wrap:
        SummaryItem = WrapSummaryItem
        break
      case TransactionType.Withdraw:
        SummaryItem = WithdrawSummaryItem
        break
      case TransactionType.LPIncentivesClaimRewards:
      case TransactionType.CollectFees:
      case TransactionType.CreatePair:
      case TransactionType.CreatePool:
      case TransactionType.LiquidityIncrease:
      case TransactionType.LiquidityDecrease:
        SummaryItem = LiquiditySummaryItem
        break
      default:
        SummaryItem = UnknownSummaryItem
    }

    return createElement(SummaryItem as React.FunctionComponent<SummaryItemProps>, {
      key: item.id,
      authTrigger,
      transaction: item,
      swapCallbacks,
      index,
      isExternalProfile,
    })
  }
}
