import { Flex, styled } from '@luxfi/ui/src'
import { isMobileApp } from '@luxfi/utilities/src/platform'

export const WarningModalInfoContainer = styled(Flex, {
  width: '100%',
  backgroundColor: '$surface2',
  px: '$spacing16',
  py: isMobileApp ? '$spacing8' : '$spacing12',
  alignItems: 'center',
  flexWrap: 'nowrap',
})
