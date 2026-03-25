import { PlanResponse } from '@luxexchange/api/src/clients/trading/__generated__/models/PlanResponse'
import { AssetType } from '@luxexchange/lx/src/entities/assets'
import { extractPlanResponseAssetDetails } from '@luxexchange/lx/src/features/activity/extract/extractPlanResponseDetails'
import { useSwapFormStore } from '@luxexchange/lx/src/features/transactions/swap/stores/swapFormStore/useSwapFormStore'
import { CurrencyField } from '@luxexchange/lx/src/types/currency'
import { currencyIdToAddress } from '@luxexchange/lx/src/utils/currencyId'
import { useEvent } from '@luxfi/utilities/src/react/hooks'

export function usePopulateSwapFlowWithPlan(): (planResponse: PlanResponse) => void {
  const updateSwapForm = useSwapFormStore((s) => s.updateSwapForm)

  return useEvent((planResponse: PlanResponse): void => {
    const extractedAssetDetails = extractPlanResponseAssetDetails(planResponse.steps)
    if (!extractedAssetDetails) {
      return
    }
    const { tokenInChainId, tokenOutChainId, inputCurrencyId, outputCurrencyId, inputCurrencyAmountRaw } =
      extractedAssetDetails

    updateSwapForm({
      input: {
        type: AssetType.Currency,
        chainId: tokenInChainId,
        address: currencyIdToAddress(inputCurrencyId),
      },
      output: {
        type: AssetType.Currency,
        chainId: tokenOutChainId,
        address: currencyIdToAddress(outputCurrencyId),
      },
      exactCurrencyField: CurrencyField.INPUT,
      exactAmountToken: inputCurrencyAmountRaw,
      exactAmountFiat: undefined,
      showPendingUI: false,
      isConfirmed: false,
      instantReceiptFetchTime: undefined,
      instantOutputAmountRaw: undefined,
      txHash: undefined,
      txHashReceivedTime: undefined,
      isSubmitting: false,
      focusOnCurrencyField: undefined,
      isFiatMode: false,
    })
  })
}
