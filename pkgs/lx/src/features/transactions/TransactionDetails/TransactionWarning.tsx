import { TouchableArea } from '@luxfi/ui/src'
import { InlineWarningCard } from '@luxexchange/lx/src/components/InlineWarningCard/InlineWarningCard'
import { Warning } from '@luxexchange/lx/src/components/modals/WarningModal/types'

export const TransactionWarning = ({
  warning,
  onShowWarning,
}: {
  warning: Warning
  onShowWarning: () => void
}): JSX.Element => {
  const { title, severity, message, link } = warning

  return (
    <TouchableArea onPress={onShowWarning}>
      <InlineWarningCard hideCtaIcon severity={severity} heading={title} description={message} learnMoreUrl={link} />
    </TouchableArea>
  )
}
