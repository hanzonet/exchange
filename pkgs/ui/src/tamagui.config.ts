import { createTamagui } from 'tamagui'
import { animations } from '@luxfi/ui/src/theme/animations'
import { configWithoutAnimations } from '@luxfi/ui/src/theme/config'

export type { TamaguiGroupNames } from '@luxfi/ui/src/theme/config'

export const config = createTamagui({
  animations,
  ...configWithoutAnimations,
})

export default config
