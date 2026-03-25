import { AppStackScreenProp } from 'src/app/navigation/types'
import { ReactNavigationModal } from 'src/components/modals/ReactNavigationModals/ReactNavigationModal'
<<<<<<< Updated upstream
import { ModalName } from 'lx/src/features/telemetry/constants'
import { SmartWalletAdvancedSettingsModal } from 'wallet/src/components/smartWallet/modals/SmartWalletAdvancedSettingsModal'
=======
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { SmartWalletAdvancedSettingsModal } from '@luxfi/wallet/src/components/smartWallet/modals/SmartWalletAdvancedSettingsModal'
>>>>>>> Stashed changes

export const AdvancedSettingsModal = (
  props: AppStackScreenProp<typeof ModalName.SmartWalletAdvancedSettingsModal>,
): JSX.Element => {
  return <ReactNavigationModal {...props} modalComponent={SmartWalletAdvancedSettingsModal} />
}
