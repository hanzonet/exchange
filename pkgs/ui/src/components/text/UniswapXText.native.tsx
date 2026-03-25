import { GetProps } from 'tamagui'
import { Text } from '@luxfi/ui/src/components/text'
import { GradientText } from '@luxfi/ui/src/components/text/GradientText'
import { colors } from '@luxfi/ui/src/theme/color/colors'

export function UniswapXText({ children, ...props }: GetProps<typeof Text>): JSX.Element {
  return (
    <GradientText
      {...props}
      gradient={{
        colors: [colors.uniswapXViolet, colors.uniswapXPurple],
        start: { x: -1.07, y: 0 },
        end: { x: 1.07, y: 0 },
      }}
    >
      {children}
    </GradientText>
  )
}
