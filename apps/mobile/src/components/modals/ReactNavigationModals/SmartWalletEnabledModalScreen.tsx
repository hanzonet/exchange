import { AppStackScreenProp } from 'src/app/navigation/types'
import { ReactNavigationModal } from 'src/components/modals/ReactNavigationModals/ReactNavigationModal'
<<<<<<< Updated upstream
import { ModalName } from 'lx/src/features/telemetry/constants'
import { SmartWalletEnabledModal } from 'wallet/src/components/smartWallet/modals/SmartWalletEnabledModal'
=======
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { SmartWalletEnabledModal } from '@luxfi/wallet/src/components/smartWallet/modals/SmartWalletEnabledModal'
>>>>>>> Stashed changes

export const SmartWalletEnabledModalScreen = (
  props: AppStackScreenProp<typeof ModalName.SmartWalletEnabledModal>,
): JSX.Element => {
  return <ReactNavigationModal {...props} modalComponent={SmartWalletEnabledModal} />
}
