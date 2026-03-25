import { NotificationToast } from '@luxexchange/lx/src/components/notifications/NotificationToast'
import { AppNotificationDefault } from '@luxexchange/lx/src/features/notifications/slice/types'

export function DefaultNotification({
  notification: { address, title, hideDelay },
}: {
  notification: AppNotificationDefault
}): JSX.Element {
  return <NotificationToast address={address} hideDelay={hideDelay} title={title} />
}
