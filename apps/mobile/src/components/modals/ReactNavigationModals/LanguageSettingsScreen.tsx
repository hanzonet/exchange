import { AppStackScreenProp } from 'src/app/navigation/types'
import { ReactNavigationModal } from 'src/components/modals/ReactNavigationModals/ReactNavigationModal'
<<<<<<< Updated upstream
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { SettingsLanguageModal } from '@luxfi/wallet/src/components/settings/language/SettingsLanguageModal'
=======
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { SettingsLanguageModal } from '@luxfi/wallet/src/components/settings/language/SettingsLanguageModal'
>>>>>>> Stashed changes

export const LanguageSettingsScreen = (props: AppStackScreenProp<typeof ModalName.LanguageSelector>): JSX.Element => {
  return <ReactNavigationModal {...props} modalComponent={SettingsLanguageModal} />
}
