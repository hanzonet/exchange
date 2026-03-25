import { PlainImage } from '@luxfi/ui/src/components/UniversalImage/internal/PlainImage'
import type { FastImageWrapperProps } from '@luxfi/ui/src/components/UniversalImage/types'

// For web, fall back to plain image
export function FastImageWrapper({ setError: _, ...rest }: FastImageWrapperProps): JSX.Element | null {
  return <PlainImage {...rest} />
}
