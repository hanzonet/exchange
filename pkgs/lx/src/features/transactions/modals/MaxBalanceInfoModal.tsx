import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@luxfi/ui/src'
import { WarningSeverity } from '@luxexchange/lx/src/components/modals/WarningModal/types'
import { WarningModal } from '@luxexchange/lx/src/components/modals/WarningModal/WarningModal'
import { InfoTooltip } from '@luxexchange/lx/src/components/tooltip/InfoTooltip'
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { isWebPlatform } from '@luxfi/utilities/src/platform'

interface MaxBalanceInfoModalProps {
  isMax: boolean
  isModalOpen: boolean
  isTooltipEnabled: boolean
  currencySymbol?: string
  onClose: () => void
}

// similar to `WarningInfo` but it's a controlled modal
export function MaxBalanceInfoModal({
  isMax,
  children,
  isModalOpen,
  isTooltipEnabled,
  currencySymbol,
  onClose,
}: PropsWithChildren<MaxBalanceInfoModalProps>): JSX.Element {
  const { t } = useTranslation()

  if (isWebPlatform) {
    if (!isTooltipEnabled) {
      return <>{children}</>
    }

    return (
      <InfoTooltip
        text={
          <Text variant="body4" textAlign="left" color="$neutral2">
            {isMax
              ? t('transaction.networkCost.maxNativeBalance.description')
              : t('transaction.networkCost.presetNativeBalance.description')}
          </Text>
        }
        placement="top"
        trigger={children}
      />
    )
  }

  return (
    <>
      {children}
      <WarningModal
        caption={
          isMax
            ? t('transaction.networkCost.maxNativeBalance.description')
            : t('transaction.networkCost.presetNativeBalance.description')
        }
        isOpen={isModalOpen}
        modalName={ModalName.NativeBalanceInfo}
        severity={WarningSeverity.Low}
        title={
          isMax
            ? t('transaction.networkCost.maxNativeBalance.title')
            : t('transaction.networkCost.presetNativeBalance.title')
        }
        rejectText={t('common.button.close')}
        onClose={onClose}
        onReject={onClose}
      />
    </>
  )
}
