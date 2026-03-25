import { useTranslation } from 'react-i18next'
import { useSporeColors } from '@luxfi/ui/src'
import { Settings } from '@luxfi/ui/src/components/icons/Settings'
import { zIndexes } from '@luxfi/ui/src/theme'
import { WarningSeverity } from '@luxexchange/lx/src/components/modals/WarningModal/types'
import { WarningInfo } from '@luxexchange/lx/src/components/modals/WarningModal/WarningInfo'
import { LearnMoreLink } from '@luxexchange/lx/src/components/text/LearnMoreLink'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { SlippageInfoCaption } from '@luxexchange/lx/src/features/transactions/swap/components/MaxSlippageRow/SlippageInfo/SlippageInfoCaption'
import type { SlippageInfoProps } from '@luxexchange/lx/src/features/transactions/swap/components/MaxSlippageRow/SlippageInfo/types'
import { MaxSlippageTooltip } from '@luxexchange/lx/src/features/transactions/swap/form/SwapFormScreen/SwapFormTooltips/MaxSlippageTooltip'
import { usePriceUXEnabled } from '@luxexchange/lx/src/features/transactions/swap/hooks/usePriceUXEnabled'
// biome-ignore lint/style/noRestrictedImports: legacy import will be migrated
import { formatCurrencyAmount } from '@luxfi/utilities/src/format/localeBased'
import { NumberType } from '@luxfi/utilities/src/format/types'
import { isMobileApp } from '@luxfi/utilities/src/platform'

export function SlippageInfo({
  children,
  trade,
  isCustomSlippage,
  autoSlippageTolerance,
}: SlippageInfoProps): JSX.Element {
  const { t } = useTranslation()
  const colors = useSporeColors()
  const priceUxEnabled = usePriceUXEnabled()

  // Avoid showing min out / max in UI when on an indicative quote.
  if (trade.indicative) {
    return <>{children}</>
  }

  const formattedMinimumAmount = `${formatCurrencyAmount({
    amount: trade.minAmountOut,
    locale: 'en-US',
    type: NumberType.TokenTx,
    placeholder: '-',
  })} ${trade.outputAmount.currency.symbol}`

  const captionContent = (
    <SlippageInfoCaption
      trade={trade}
      isCustomSlippage={isCustomSlippage}
      autoSlippageTolerance={autoSlippageTolerance}
    />
  )

  return (
    <WarningInfo
      infoButton={isMobileApp ? <LearnMoreLink url={luxUrls.helpArticleUrls.swapSlippage} /> : null}
      modalProps={{
        backgroundIconColor: colors.surface2.get(),
        captionComponent: captionContent,
        rejectText: t('common.button.close'),
        icon: <Settings color="$neutral2" size="$icon.28" />,
        modalName: ModalName.SlippageInfo,
        severity: WarningSeverity.None,
        title: t('swap.slippage.settings.title'),
        zIndex: zIndexes.popover,
      }}
      tooltipProps={{
        text: priceUxEnabled ? (
          <MaxSlippageTooltip
            receivedAmount={formattedMinimumAmount}
            minimumAmount={formattedMinimumAmount}
            autoSlippageEnabled={!isCustomSlippage}
            currentSlippageTolerance={formattedMinimumAmount}
          />
        ) : (
          captionContent
        ),
        maxWidth: priceUxEnabled ? 300 : 272,
        placement: 'top',
      }}
      analyticsTitle="Max Slippage"
    >
      {children}
    </WarningInfo>
  )
}
