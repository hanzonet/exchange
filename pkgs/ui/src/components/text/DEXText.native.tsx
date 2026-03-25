import type { GetProps } from '@hanzo/gui'
import type { Text } from '@luxfi/ui/src/components/text'
import { GradientText } from '@luxfi/ui/src/components/text/GradientText'
import { colors } from '@luxfi/ui/src/theme/color/colors'

export function DEXText({ children, ...props }: GetProps<typeof Text>): JSX.Element {
  return (
    <GradientText
      {...props}
      gradient={{
        colors: [colors.dexViolet, colors.dexPurple],
        start: { x: -1.07, y: 0 },
        end: { x: 1.07, y: 0 },
      }}
    >
      {children}
    </GradientText>
  )
}
