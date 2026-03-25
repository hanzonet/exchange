import { useState } from 'react'
import { PlanDetailsView } from '@luxexchange/lx/src/components/activity/details/plan/PlanDetailsView'
import { TransactionDetailsOverview } from '@luxexchange/lx/src/components/activity/details/TransactionDetailsOverview'
import { Modal } from '@luxexchange/lx/src/components/modals/Modal'
import { useTransactionActions } from '@luxexchange/lx/src/features/activity/hooks/useTransactionActions'
import { AuthTrigger } from '@luxexchange/lx/src/features/auth/types'
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { TransactionDetails } from '@luxexchange/lx/src/features/transactions/types/transactionDetails'
import { isPlanTransactionInfo } from '@luxexchange/lx/src/features/transactions/types/utils'
import { TestID } from '@luxexchange/lx/src/test/fixtures/testIDs'
import { isExtensionApp } from '@luxfi/utilities/src/platform'
import { useEvent } from '@luxfi/utilities/src/react/hooks'

export type TransactionDetailsModalProps = {
  isExternalProfile?: boolean
  transactionDetails: TransactionDetails
  authTrigger?: AuthTrigger
  onClose: () => void
  onReportSuccess?: () => void
  onUnhideTransaction?: () => void
  onCopySuccess?: () => void
}

enum TransactionDetailsView {
  Overview = 'Overview',
  Plan = 'Plan',
}

export function TransactionDetailsModal(props: TransactionDetailsModalProps): JSX.Element {
  const { transactionDetails } = props
  const { typeInfo, status } = transactionDetails
  const { renderModals, openCancelModal, menuItems } = useTransactionActions({
    ...props,
    transaction: props.transactionDetails,
  })
  const [view, setView] = useState<TransactionDetailsView>(TransactionDetailsView.Overview)

  const openPlanView = useEvent(() => setView(TransactionDetailsView.Plan))
  const closePlanView = useEvent(() => setView(TransactionDetailsView.Overview))

  return (
    <>
      <Modal
        isDismissible
        alignment={isExtensionApp ? 'top' : 'center'}
        name={ModalName.TransactionDetails}
        testID={TestID.TransactionDetailsModal}
        onClose={props.onClose}
      >
        {view === TransactionDetailsView.Overview && (
          <TransactionDetailsOverview
            {...props}
            openPlanView={openPlanView}
            openCancelModal={openCancelModal}
            menuItems={menuItems}
          />
        )}
        {view === TransactionDetailsView.Plan && isPlanTransactionInfo(typeInfo) && (
          <PlanDetailsView typeInfo={typeInfo} status={status} closePlanView={closePlanView} onClose={props.onClose} />
        )}
      </Modal>
      {renderModals()}
    </>
  )
}
