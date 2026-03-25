import { AlertTriangleFilled } from '@luxfi/ui/src/components/icons'
import { NotificationToast } from '@luxexchange/lx/src/components/notifications/NotificationToast'
import { AppErrorNotification } from '@luxexchange/lx/src/features/notifications/slice/types'

export function ErrorNotification({
  notification: { address, errorMessage, hideDelay },
}: {
  notification: AppErrorNotification
}): JSX.Element {
  return (
    <NotificationToast
      smallToast
      address={address}
      hideDelay={hideDelay}
      icon={<AlertTriangleFilled color="$neutral2" size="$icon.24" />}
      title={errorMessage}
    />
  )
}
