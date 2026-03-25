import { TouchableArea } from '@luxfi/ui/src'
import { GetHelpButtonUI } from '@luxexchange/lx/src/components/dialog/GetHelpButtonUI'
import type { GetHelpHeaderProps } from '@luxexchange/lx/src/components/dialog/GetHelpHeader'
import { type GetHelpButtonProps, GetHelpHeaderContent } from '@luxexchange/lx/src/components/dialog/GetHelpHeaderContent'
import { luxUrls } from '@luxexchange/lx/src/constants/urls'
import { openUri } from '@luxexchange/lx/src/utils/linking'

function NativeGetHelpButton({ url }: GetHelpButtonProps): JSX.Element {
  const handlePress = async (): Promise<void> => {
    await openUri({ uri: url ?? luxUrls.helpUrl })
  }

  return (
    <TouchableArea onPress={handlePress}>
      <GetHelpButtonUI />
    </TouchableArea>
  )
}

export function GetHelpHeader(props: GetHelpHeaderProps): JSX.Element {
  return <GetHelpHeaderContent {...props} GetHelpButton={NativeGetHelpButton} />
}
