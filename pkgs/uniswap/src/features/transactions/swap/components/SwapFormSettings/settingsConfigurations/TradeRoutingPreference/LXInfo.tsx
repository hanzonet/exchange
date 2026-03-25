import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { LXText } from 'ui/src'
import { LX } from 'ui/src/components/icons/LX'
import { colors, opacify, zIndexes } from 'ui/src/theme'
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types'
import { WarningInfo } from 'uniswap/src/components/modals/WarningModal/WarningInfo'
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink'
import type { InfoTooltipProps } from 'uniswap/src/components/tooltip/InfoTooltipProps'
import { uniswapUrls } from 'uniswap/src/constants/urls'
import { ModalName } from 'uniswap/src/features/telemetry/constants'
import { isWebPlatform } from 'utilities/src/platform'

export function LXInfo({
  children,
  tooltipTrigger,
  placement = 'top',
}: PropsWithChildren<{
  tooltipTrigger?: InfoTooltipProps['trigger']
  placement?: InfoTooltipProps['placement']
}>): JSX.Element {
  const { t } = useTranslation()

  return (
    <WarningInfo
      infoButton={
        <LearnMoreLink
          textVariant={isWebPlatform ? 'body4' : undefined}
          url={uniswapUrls.helpArticleUrls.uniswapXInfo}
        />
      }
      modalProps={{
        backgroundIconColor: opacify(16, colors.uniswapXPurple),
        caption: t('lx.description'),
        rejectText: t('common.button.close'),
        icon: <LX size="$icon.24" />,
        modalName: ModalName.LXInfo,
        severity: WarningSeverity.None,
        titleComponent: (
          <LXText variant={isWebPlatform ? 'subheading2' : 'body1'}>{t('lx.label')}</LXText>
        ),
        zIndex: zIndexes.popover,
      }}
      tooltipProps={{
        text: t('lx.description'),
        placement,
        icon: <LX size="$icon.24" />,
      }}
      trigger={tooltipTrigger}
      analyticsTitle="LX info"
    >
      {children}
    </WarningInfo>
  )
}
