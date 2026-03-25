import { TamaguiProvider as OGTamaguiProvider, TamaguiProviderProps } from 'tamagui'
import { config } from '@luxfi/ui/src/tamagui.config'

/**
 * Helper component to wrap tests in a provider for tests.
 */
export function SharedUILuxProvider({ children }: Pick<TamaguiProviderProps, 'children'>): JSX.Element {
  return (
    <OGTamaguiProvider config={config} defaultTheme="dark">
      {children}
    </OGTamaguiProvider>
  )
}
