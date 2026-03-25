import { useTranslation } from 'react-i18next'
import { useSporeColors } from '@luxfi/ui/src'
import { ShieldCheck } from '@luxfi/ui/src/components/icons'
import { zIndexes } from '@luxfi/ui/src/theme'
import { WarningModal } from '@luxexchange/lx/src/components/modals/WarningModal/WarningModal'
import { LearnMoreLink } from '@luxexchange/lx/src/components/text/LearnMoreLink'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'

export function SwapProtectionInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): JSX.Element {
  const colors = useSporeColors()
  const { t } = useTranslation()

  return (
    <WarningModal
      backgroundIconColor={colors.statusSuccess2.val}
      caption={t('swap.settings.protection.description')}
      rejectText={t('common.button.close')}
      icon={<ShieldCheck color="$statusSuccess" size="$icon.24" />}
      isOpen={isOpen}
      modalName={ModalName.SwapProtection}
      title={t('swap.settings.protection.title')}
      zIndex={zIndexes.popover}
      onClose={onClose}
    >
      <LearnMoreLink url={luxUrls.helpArticleUrls.swapProtection} />
    </WarningModal>
  )
}
