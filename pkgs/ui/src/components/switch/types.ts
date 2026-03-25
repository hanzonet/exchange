import type { SwitchProps as GuiSwitchProps } from '@hanzo/gui'
import type { SporeComponentVariant } from '@luxfi/ui/src/components/types'

export type SwitchProps = GuiSwitchProps & {
  variant: SporeComponentVariant
}
