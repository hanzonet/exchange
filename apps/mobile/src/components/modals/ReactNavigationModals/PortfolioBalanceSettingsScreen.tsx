import { AppStackScreenProp } from 'src/app/navigation/types'
import { ReactNavigationModal } from 'src/components/modals/ReactNavigationModals/ReactNavigationModal'
<<<<<<< Updated upstream
import { ModalName } from 'lx/src/features/telemetry/constants'
import { PortfolioBalanceModal } from 'wallet/src/components/settings/portfolioBalance/PortfolioBalanceModal'
=======
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { PortfolioBalanceModal } from '@luxfi/wallet/src/components/settings/portfolioBalance/PortfolioBalanceModal'
>>>>>>> Stashed changes

export const PortfolioBalanceSettingsScreen = (
  props: AppStackScreenProp<typeof ModalName.PortfolioBalanceModal>,
): JSX.Element => {
  return <ReactNavigationModal {...props} modalComponent={PortfolioBalanceModal} />
}
