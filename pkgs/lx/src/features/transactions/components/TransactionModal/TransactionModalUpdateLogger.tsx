import { useEffect } from 'react'
import type { ModalNameType } from '@luxexchange/lx/src/features/telemetry/constants'
import { ModalName } from '@luxexchange/lx/src/features/telemetry/constants'
import { useTransactionModalContext } from '@luxexchange/lx/src/features/transactions/components/TransactionModal/TransactionModalContext'
import { logContextUpdate } from '@luxfi/utilities/src/logger/contextEnhancer'

export function TransactionModalUpdateLogger({ modalName }: { modalName: ModalNameType }): null {
  const { screen } = useTransactionModalContext()

  useEffect(() => {
    if (modalName === ModalName.Swap) {
      logContextUpdate('TransactionModal', { screen, modalName })
    }
  }, [modalName, screen])

  return null
}
