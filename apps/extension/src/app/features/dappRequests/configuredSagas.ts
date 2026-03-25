import { createPrepareAndSignDappTransactionSaga } from 'src/app/features/dappRequests/sagas/prepareAndSignDappTransactionSaga'
<<<<<<< Updated upstream
import { createMonitoredSaga } from '@luxexchange/lx/src/utils/saga'
import { getSharedTransactionSagaDependencies } from '@luxfi/wallet/src/features/transactions/configuredSagas'
=======
import { createMonitoredSaga } from '@luxexchange/lx/src/utils/saga'
import { getSharedTransactionSagaDependencies } from '@luxfi/wallet/src/features/transactions/configuredSagas'
>>>>>>> Stashed changes

// Create configured saga instance using shared transaction dependencies
const configuredPrepareAndSignDappTransactionSaga = createPrepareAndSignDappTransactionSaga(
  getSharedTransactionSagaDependencies(),
)

// Export the monitored saga
export const {
  name: prepareAndSignDappTransactionSagaName,
  wrappedSaga: prepareAndSignDappTransactionSaga,
  reducer: prepareAndSignDappTransactionReducer,
  actions: prepareAndSignDappTransactionActions,
} = createMonitoredSaga({
  saga: configuredPrepareAndSignDappTransactionSaga,
  name: 'prepareAndSignDappTransaction',
})
