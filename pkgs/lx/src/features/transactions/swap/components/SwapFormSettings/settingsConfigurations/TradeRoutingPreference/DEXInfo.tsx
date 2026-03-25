import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { DEXText } from '@luxfi/ui/src'
import { DEX } from '@luxfi/ui/src/components/icons/DEX'
import { colors, opacify, zIndexes } from '@luxfi/ui/src/theme'
import { WarningSeverity } from '@luxexchange/lx/src/components/modals/WarningModal/types'
import { WarningInfo } from '@luxexchange/lx/src/components/modals/WarningModal/WarningInfo'
import { LearnMoreLink } from '@luxexchange/lx/src/components/text/LearnMoreLink'
import type { InfoTooltipProps } from '@luxexchange/lx/src/components/tooltip/InfoTooltipProps'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { isWebPlatform } from '@luxfi/utilities/src/platform'

export function DEXInfo({
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
          url={luxUrls.helpArticleUrls.dexInfo}
        />
      }
      modalProps={{
        backgroundIconColor: opacify(16, colors.dexPurple),
        caption: t('dex.description'),
        rejectText: t('common.button.close'),
        icon: <DEX size="$icon.24" />,
        modalName: ModalName.DEXInfo,
        severity: WarningSeverity.None,
        titleComponent: (
          <DEXText variant={isWebPlatform ? 'subheading2' : 'body1'}>{t('dex.label')}</DEXText>
        ),
        zIndex: zIndexes.popover,
      }}
      tooltipProps={{
        text: t('dex.description'),
        placement,
        icon: <DEX size="$icon.24" />,
      }}
      trigger={tooltipTrigger}
      analyticsTitle="DEX info"
    >
      {children}
    </WarningInfo>
  )
}
