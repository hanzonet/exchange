import { useMemo } from 'react'
import { getNativeAddress } from '@luxexchange/lx/src/constants/addresses'
import type { TradeableAsset } from '@luxexchange/lx/src/entities/assets'
import { AssetType } from '@luxexchange/lx/src/entities/assets'
import { useEnabledChains } from '@luxexchange/lx/src/features/chains/hooks/useEnabledChains'
import type { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import type { SwapFormState } from '@luxexchange/lx/src/features/transactions/swap/stores/swapFormStore/types'
import { CurrencyField } from '@luxexchange/lx/src/types/currency'

const getDefaultInputCurrency = (chainId: UniverseChainId): TradeableAsset => ({
  address: getNativeAddress(chainId),
  chainId,
  type: AssetType.Currency,
})

export const getDefaultState = (defaultChainId: UniverseChainId): Readonly<Omit<SwapFormState, 'account'>> => ({
  exactAmountFiat: undefined,
  exactAmountToken: '',
  exactCurrencyField: CurrencyField.INPUT,
  focusOnCurrencyField: CurrencyField.INPUT,
  filteredChainIds: {},
  input: getDefaultInputCurrency(defaultChainId),
  output: undefined,
  isFiatMode: false,
  isMax: false,
  isSubmitting: false,
  isConfirmed: false,
  showPendingUI: false,
  instantReceiptFetchTime: undefined,
  instantOutputAmountRaw: undefined,
  txHash: undefined,
  txHashReceivedTime: undefined,
})

export const useDefaultSwapFormState = (): ReturnType<typeof getDefaultState> => {
  const { defaultChainId } = useEnabledChains()

  return useMemo(() => getDefaultState(defaultChainId), [defaultChainId])
}
