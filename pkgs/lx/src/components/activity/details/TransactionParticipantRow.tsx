import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Flex } from '@luxfi/ui/src'
import { CopyAlt } from '@luxfi/ui/src/components/icons/CopyAlt'
import { Person } from '@luxfi/ui/src/components/icons/Person'
import { InfoRow } from '@luxexchange/lx/src/components/activity/details/InfoRow'
import { TransactionParticipantDisplay } from '@luxexchange/lx/src/components/activity/details/TransactionParticipantDisplay'
import { TransactionParticipantRowProps } from '@luxexchange/lx/src/components/activity/details/types'
import { ContextMenu, MenuOptionItem } from '@luxexchange/lx/src/components/menus/ContextMenu'
import { ContextMenuTriggerMode } from '@luxexchange/lx/src/components/menus/types'
import { useLuxContext } from '@luxexchange/lx/src/contexts/LuxContext'
import { pushNotification } from '@luxexchange/lx/src/features/notifications/slice/slice'
import { AppNotificationType, CopyNotificationType } from '@luxexchange/lx/src/features/notifications/slice/types'
import { setClipboard } from '@luxfi/utilities/src/clipboard/clipboard'
import { useBooleanState } from '@luxfi/utilities/src/react/useBooleanState'

export function TransactionParticipantRow({
  address,
  isSend = false,
  onClose,
}: TransactionParticipantRowProps): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { navigateToExternalProfile } = useLuxContext()

  const { value: isContextMenuOpen, setTrue: openContextMenu, setFalse: closeContextMenu } = useBooleanState(false)

  const onCopyAddress = async (): Promise<void> => {
    await setClipboard(address)
    dispatch(
      pushNotification({
        type: AppNotificationType.Copied,
        copyType: CopyNotificationType.Address,
      }),
    )
  }

  const onViewProfile = (): void => {
    navigateToExternalProfile({ address })
    onClose()
  }

  const options: MenuOptionItem[] = [
    {
      label: t('common.copy.address'),
      onPress: onCopyAddress,
      Icon: CopyAlt,
    },
    {
      label: t('common.view.profile'),
      onPress: onViewProfile,
      Icon: Person,
    },
  ]

  return (
    <InfoRow label={isSend ? t('common.text.recipient') : t('common.text.sender')}>
      <Flex>
        <ContextMenu
          isPlacementAbove
          menuItems={options}
          triggerMode={ContextMenuTriggerMode.Primary}
          isOpen={isContextMenuOpen}
          closeMenu={closeContextMenu}
          openMenu={openContextMenu}
        >
          <TransactionParticipantDisplay address={address} />
        </ContextMenu>
      </Flex>
    </InfoRow>
  )
}
