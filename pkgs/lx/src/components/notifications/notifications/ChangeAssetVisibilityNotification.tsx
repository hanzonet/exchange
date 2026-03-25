import { useTranslation } from 'react-i18next'
import { Eye } from '@luxfi/ui/src/components/icons/Eye'
import { EyeOff } from '@luxfi/ui/src/components/icons/EyeOff'
import { NotificationToast } from '@luxexchange/lx/src/components/notifications/NotificationToast'
import { ChangeAssetVisibilityNotification as ChangeAssetVisibilityNotificationType } from '@luxexchange/lx/src/features/notifications/slice/types'

export function ChangeAssetVisibilityNotification({
  notification: { visible, hideDelay, assetName },
}: {
  notification: ChangeAssetVisibilityNotificationType
}): JSX.Element {
  const { t } = useTranslation()

  return (
    <NotificationToast
      smallToast
      hideDelay={hideDelay}
      icon={visible ? <EyeOff color="$neutral1" size="$icon.24" /> : <Eye color="$neutral1" size="$icon.24" />}
      title={
        visible
          ? t('notification.assetVisibility.hidden', { assetName })
          : t('notification.assetVisibility.unhidden', { assetName })
      }
    />
  )
}
