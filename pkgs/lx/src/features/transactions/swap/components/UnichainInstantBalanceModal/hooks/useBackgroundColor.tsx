import { useSporeColors } from '@luxfi/ui/src'

export function useBackgroundColor(): string {
  const {
    surface1: { val },
  } = useSporeColors()

  return val
}
