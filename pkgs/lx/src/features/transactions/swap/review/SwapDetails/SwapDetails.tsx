import type { GasFeeResult } from '@luxexchange/api'
import { type TradingApi } from '@luxexchange/api'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, HeightAnimator, Text } from '@luxfi/ui/src'
import type { Warning } from '@luxexchange/lx/src/components/modals/WarningModal/types'
import type { CurrencyInfo } from '@luxexchange/lx/src/features/dataApi/types'
import { EstimatedSwapTime } from '@luxexchange/lx/src/features/transactions/swap/components/EstimatedBridgeTime'
import { MaxSlippageRow } from '@luxexchange/lx/src/features/transactions/swap/components/MaxSlippageRow/MaxSlippageRow'
import { PriceImpactRow } from '@luxexchange/lx/src/features/transactions/swap/components/PriceImpactRow/PriceImpactRow'
import { RoutingInfo } from '@luxexchange/lx/src/features/transactions/swap/components/RoutingInfo/RoutingInfo'
import { SwapRateRatio } from '@luxexchange/lx/src/features/transactions/swap/components/SwapRateRatio'
import { useIsUnichainFlashblocksEnabled } from '@luxexchange/lx/src/features/transactions/swap/hooks/useIsUnichainFlashblocksEnabled'
import { usePriceUXEnabled } from '@luxexchange/lx/src/features/transactions/swap/hooks/usePriceUXEnabled'
import { AcceptNewQuoteRow } from '@luxexchange/lx/src/features/transactions/swap/review/SwapDetails/AcceptNewQuoteRow'
import type { DerivedSwapInfo } from '@luxexchange/lx/src/features/transactions/swap/types/derivedSwapInfo'
import type { DEXGasBreakdown } from '@luxexchange/lx/src/features/transactions/swap/types/swapTxAndGasInfo'
import { getSwapFeeUsdFromDerivedSwapInfo } from '@luxexchange/lx/src/features/transactions/swap/utils/getSwapFeeUsd'
import { isBridge, isChained, isMultiChainGasQuote } from '@luxexchange/lx/src/features/transactions/swap/utils/routing'
import { TransactionDetails } from '@luxexchange/lx/src/features/transactions/TransactionDetails/TransactionDetails'
import type {
  FeeOnTransferFeeGroupProps,
  TokenWarningProps,
} from '@luxexchange/lx/src/features/transactions/TransactionDetails/types'
import { CurrencyField } from '@luxexchange/lx/src/types/currency'
import { isMobileApp, isMobileWeb } from '@luxfi/utilities/src/platform'

interface SwapDetailsProps {
  acceptedDerivedSwapInfo: DerivedSwapInfo<CurrencyInfo, CurrencyInfo>
  autoSlippageTolerance?: number
  customSlippageTolerance?: number
  derivedSwapInfo: DerivedSwapInfo<CurrencyInfo, CurrencyInfo>
  feeOnTransferProps?: FeeOnTransferFeeGroupProps
  tokenWarningProps: TokenWarningProps
  tokenWarningChecked?: boolean
  gasFallbackUsed?: boolean
  gasFee: GasFeeResult
  dexGasBreakdown?: DEXGasBreakdown
  newTradeRequiresAcceptance: boolean
  warning?: Warning
  onAcceptTrade: () => void
  onShowWarning?: () => void
  setTokenWarningChecked?: (checked: boolean) => void
  txSimulationErrors?: TradingApi.TransactionFailureReason[]
  includesDelegation?: boolean
}

export function SwapDetails({
  acceptedDerivedSwapInfo,
  autoSlippageTolerance,
  customSlippageTolerance,
  derivedSwapInfo,
  feeOnTransferProps,
  tokenWarningProps,
  tokenWarningChecked,
  gasFee,
  dexGasBreakdown,
  newTradeRequiresAcceptance,
  warning,
  onAcceptTrade,
  onShowWarning,
  setTokenWarningChecked,
  txSimulationErrors,
  includesDelegation,
}: SwapDetailsProps): JSX.Element {
  const priceUxEnabled = usePriceUXEnabled()
  const { t } = useTranslation()

  const isBridgeTrade = derivedSwapInfo.trade.trade && isBridge(derivedSwapInfo.trade.trade)
  const routing = derivedSwapInfo.trade.trade?.routing

  const trade = derivedSwapInfo.trade.trade ?? derivedSwapInfo.trade.indicativeTrade
  const acceptedTrade = acceptedDerivedSwapInfo.trade.trade ?? acceptedDerivedSwapInfo.trade.indicativeTrade

  const swapFeeUsd = getSwapFeeUsdFromDerivedSwapInfo(derivedSwapInfo)

  const showUnichainPoweredMessage = useIsUnichainFlashblocksEnabled(derivedSwapInfo.chainId)

  if (!trade) {
    throw new Error('Invalid render of `SwapDetails` with no `trade`')
  }

  if (!acceptedTrade) {
    throw new Error('Invalid render of `SwapDetails` with no `acceptedTrade`')
  }

  const tradeQuote = derivedSwapInfo.trade.trade?.quote

  const estimatedSwapTime: number | undefined = useMemo(() => {
    if (!tradeQuote) {
      return undefined
    }

    if (isChained(tradeQuote)) {
      return tradeQuote.quote.timeEstimateMs
    }
    if (isBridge(tradeQuote)) {
      return tradeQuote.quote.estimatedFillTimeMs
    }

    return undefined
  }, [tradeQuote])

  const showNetworkLogo = !showUnichainPoweredMessage && !isMultiChainGasQuote(tradeQuote)

  return (
    <HeightAnimator animationDisabled={isMobileApp || isMobileWeb}>
      <TransactionDetails
        banner={
          newTradeRequiresAcceptance && (
            <AcceptNewQuoteRow
              acceptedDerivedSwapInfo={acceptedDerivedSwapInfo}
              derivedSwapInfo={derivedSwapInfo}
              onAcceptTrade={onAcceptTrade}
            />
          )
        }
        chainId={acceptedTrade.inputAmount.currency.chainId}
        feeOnTransferProps={feeOnTransferProps}
        tokenWarningProps={tokenWarningProps}
        tokenWarningChecked={tokenWarningChecked}
        setTokenWarningChecked={setTokenWarningChecked}
        gasFee={gasFee}
        swapFee={acceptedTrade.swapFee}
        swapFeeUsd={swapFeeUsd}
        indicative={acceptedTrade.indicative}
        outputCurrency={acceptedTrade.outputAmount.currency}
        showExpandedChildren={!!customSlippageTolerance}
        showNetworkLogo={showNetworkLogo}
        showWarning={warning && !newTradeRequiresAcceptance}
        transactionUSDValue={derivedSwapInfo.currencyAmountsUSDValue[CurrencyField.OUTPUT]}
        dexGasBreakdown={dexGasBreakdown}
        warning={warning}
        estimatedSwapTime={estimatedSwapTime}
        routingType={routing}
        txSimulationErrors={txSimulationErrors}
        amountUserWillReceive={derivedSwapInfo.outputAmountUserWillReceive ?? undefined}
        includesDelegation={includesDelegation}
        RateInfo={
          <Flex row alignItems="center" justifyContent="space-between">
            <Text color="$neutral2" variant="body3">
              {t('swap.details.rate')}
            </Text>
            <SwapRateRatio trade={trade} derivedSwapInfo={acceptedDerivedSwapInfo} justifyContent="flex-end" />
          </Flex>
        }
        onShowWarning={onShowWarning}
      >
        <EstimatedSwapTime showIfLongerThanCutoff={false} timeMs={estimatedSwapTime} />
        {isBridgeTrade === false && (
          <MaxSlippageRow
            acceptedDerivedSwapInfo={acceptedDerivedSwapInfo}
            autoSlippageTolerance={autoSlippageTolerance}
            customSlippageTolerance={customSlippageTolerance}
          />
        )}
        {!acceptedTrade.indicative && (
          <RoutingInfo trade={acceptedTrade} gasFee={gasFee} chainId={acceptedTrade.inputAmount.currency.chainId} />
        )}
        {!priceUxEnabled && <PriceImpactRow derivedSwapInfo={acceptedDerivedSwapInfo} />}
      </TransactionDetails>
    </HeightAnimator>
  )
}
