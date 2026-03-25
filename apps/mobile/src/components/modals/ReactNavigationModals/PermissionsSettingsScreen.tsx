import { AppStackScreenProp } from 'src/app/navigation/types'
import { ReactNavigationModal } from 'src/components/modals/ReactNavigationModals/ReactNavigationModal'
<<<<<<< Updated upstream
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { PermissionsModal } from '@luxfi/wallet/src/components/settings/permissions/PermissionsModal'
=======
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { PermissionsModal } from '@luxfi/wallet/src/components/settings/permissions/PermissionsModal'
>>>>>>> Stashed changes

export const PermissionsSettingsScreen = (
  props: AppStackScreenProp<typeof ModalName.PermissionsModal>,
): JSX.Element => {
  return <ReactNavigationModal {...props} modalComponent={PermissionsModal} />
}
