import { TokenSelectorOption } from '@luxexchange/lx/src/components/lists/items/types'
import type { OnchainItemSection } from '@luxexchange/lx/src/components/lists/OnchainItemList/types'
import { TradeableAsset } from '@luxexchange/lx/src/entities/assets'
import type { AddressGroup } from '@luxexchange/lx/src/features/accounts/store/types/AccountsState'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { CurrencyInfo } from '@luxexchange/lx/src/features/dataApi/types'
import { FiatNumberType } from '@luxfi/utilities/src/format/types'

export type OnSelectCurrency = (
  currency: CurrencyInfo,
  section: OnchainItemSection<TokenSelectorOption>,
  index: number,
) => void

export type TokenSectionsHookProps = {
  addresses: AddressGroup
  chainFilter: UniverseChainId | null
  oppositeSelectedToken?: TradeableAsset
}

export type ConvertFiatAmountFormattedCallback = (
  fromAmount: Maybe<string | number>,
  numberType: FiatNumberType,
  placeholder?: string | undefined,
) => string

export enum TokenSelectorFlow {
  Swap = 0,
  Send = 1,
}
