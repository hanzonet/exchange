import { Token } from '@luxfi/amm-core'
import { getWrappedNativeAddress } from '@luxexchange/lx/src/constants/addresses'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from '@luxexchange/lx/src/features/chains/evm/defaults'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'

export const ETH = new Token(UniverseChainId.Mainnet, DEFAULT_NATIVE_ADDRESS_LEGACY, 18, 'ETH', 'Ethereum')

export const WETH = new Token(
  UniverseChainId.Mainnet,
  getWrappedNativeAddress(UniverseChainId.Mainnet),
  18,
  'WETH',
  'Wrapped Ether',
)
