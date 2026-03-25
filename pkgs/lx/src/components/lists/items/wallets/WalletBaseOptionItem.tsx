import { OptionItem, OptionItemProps } from '@luxexchange/lx/src/components/lists/items/OptionItem'
import { WalletOption } from '@luxexchange/lx/src/components/lists/items/types'
import { WalletOptionItemContextMenu } from '@luxexchange/lx/src/components/lists/items/wallets/WalletOptionItemContextMenu'
import { dismissNativeKeyboard } from '@luxfi/utilities/src/device/keyboard/dismissNativeKeyboard'
import { useBooleanState } from '@luxfi/utilities/src/react/useBooleanState'

type WalletBaseOptionItemProps = {
  option: WalletOption
} & OptionItemProps

export function WalletBaseOptionItem({ option, ...optionItemProps }: WalletBaseOptionItemProps): JSX.Element {
  const { value: isContextMenuOpen, setFalse: closeContextMenu, setTrue: openContextMenu } = useBooleanState(false)

  const { address, type } = option

  return (
    <WalletOptionItemContextMenu address={address} isOpen={isContextMenuOpen} closeMenu={closeContextMenu}>
      <OptionItem
        testID={`wallet-item-${type}-${address}`}
        onLongPress={() => {
          dismissNativeKeyboard()
          openContextMenu()
        }}
        {...optionItemProps}
      />
    </WalletOptionItemContextMenu>
  )
}
