import { Wallet } from '@luxexchange/lx/src/features/wallet/types/Wallet'
import { HexString } from '@luxfi/utilities/src/addresses/hex'

export interface WalletService {
  getWallet(params: { evmAddress?: HexString; svmAddress?: string }): Wallet
}
