import { PropsWithChildren } from 'react'
import { InfoTooltipProps } from '@luxexchange/lx/src/components/tooltip/InfoTooltipProps'
import { NotImplementedError } from '@luxfi/utilities/src/errors'

export function InfoTooltip(_props: PropsWithChildren<InfoTooltipProps>): JSX.Element {
  throw new NotImplementedError('InfoTooltip')
}
