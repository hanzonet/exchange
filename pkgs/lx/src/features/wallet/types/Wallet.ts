import { EVMAccountDetails, SVMAccountDetails } from '@luxexchange/lx/src/features/wallet/types/AccountDetails'

export type Wallet = {
  evmAccount?: EVMAccountDetails
  svmAccount?: SVMAccountDetails
}
