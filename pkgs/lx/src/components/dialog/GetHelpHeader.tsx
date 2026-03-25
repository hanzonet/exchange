import { ReactNode } from 'react'
import { FlexProps } from '@luxfi/ui/src'
import { NotImplementedError } from '@luxfi/utilities/src/errors'

export type GetHelpHeaderProps = {
  closeModal: () => void
  link?: string
  title?: ReactNode
  goBack?: () => void
  closeDataTestId?: string
  className?: string
} & FlexProps

export function GetHelpHeader(_props: GetHelpHeaderProps): JSX.Element {
  throw new NotImplementedError('GetHelpHeader is implemented for web and native')
}
