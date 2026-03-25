import { useTranslation } from 'react-i18next'
import { WarningSeverity } from '@luxexchange/lx/src/components/modals/WarningModal/types'
import { WarningModal } from '@luxexchange/lx/src/components/modals/WarningModal/WarningModal'
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'

export function BlockedAddressModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): JSX.Element {
  const { t } = useTranslation()

  return (
    <WarningModal
      caption={t('send.warning.blocked.modal.message')}
      rejectText={t('common.button.understand')}
      isOpen={isOpen}
      modalName={ModalName.BlockedAddress}
      severity={WarningSeverity.None}
      title={t('send.warning.blocked.modal.title')}
      onClose={onClose}
    />
  )
}
