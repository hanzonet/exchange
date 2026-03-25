import { useTranslation } from 'react-i18next'
import { NotificationToast } from '@luxexchange/lx/src/components/notifications/NotificationToast'
import { CopyFailedNotification as CopyFailedNotificationType } from '@luxexchange/lx/src/features/notifications/slice/types'

export function CopyFailedNotification({
  notification: { hideDelay = 2000 },
}: {
  notification: CopyFailedNotificationType
}): JSX.Element | null {
  const { t } = useTranslation()
  const title = t('notification.copied.failed')

  return <NotificationToast hideDelay={hideDelay} title={title} />
}
