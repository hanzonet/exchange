import { memo } from 'react'
import { DecimalPadProps } from '@luxexchange/lx/src/features/transactions/components/DecimalPadInput/types'
import { NotImplementedError } from '@luxfi/utilities/src/errors'

export const DecimalPad = memo(function DecimalPad(_props: DecimalPadProps): JSX.Element {
  throw new NotImplementedError('DecimalPad')
})
