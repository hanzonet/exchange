import React, { useCallback, useEffect, useState } from 'react'
import { RecipientSelect } from 'src/components/RecipientSelect/RecipientSelect'
import { SEND_CONTENT_RENDER_DELAY_MS } from 'src/features/send/constants'
<<<<<<< Updated upstream
import { Spacer } from 'ui/src'
import { UniverseChainId } from 'lx/src/features/chains/types'
import { TransactionModalInnerContainer } from 'lx/src/features/transactions/components/TransactionModal/TransactionModal'
import { useTransactionModalContext } from 'lx/src/features/transactions/components/TransactionModal/TransactionModalContext'
import { useSendContext } from 'wallet/src/features/transactions/contexts/SendContext'
=======
import { Spacer } from '@luxfi/ui/src'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { TransactionModalInnerContainer } from '@luxexchange/lx/src/features/transactions/components/TransactionModal/TransactionModal'
import { useTransactionModalContext } from '@luxexchange/lx/src/features/transactions/components/TransactionModal/TransactionModalContext'
import { useSendContext } from '@luxfi/wallet/src/features/transactions/contexts/SendContext'
>>>>>>> Stashed changes

// We add a short hardcoded delay to allow the sheet to animate quickly both on first render and when going back from Review -> Form.
export function SendRecipientSelectFullScreen(): JSX.Element {
  const [hideContent, setHideContent] = useState(true)
  useEffect(() => {
    setTimeout(() => setHideContent(false), SEND_CONTENT_RENDER_DELAY_MS)
  }, [])

  return <SendRecipientSelectFullScreenContent hideContent={hideContent} />
}

function SendRecipientSelectFullScreenContent({ hideContent }: { hideContent: boolean }): JSX.Element {
  const { bottomSheetViewStyles } = useTransactionModalContext()
  const { recipient, derivedSendInfo, updateSendForm } = useSendContext()

  const onSelectRecipient = useCallback(
    (newRecipient: string) => {
      updateSendForm({ recipient: newRecipient, showRecipientSelector: false })
    },
    [updateSendForm],
  )

  const onHideRecipientSelector = useCallback(() => {
    updateSendForm({ showRecipientSelector: false })
  }, [updateSendForm])

  return (
    <TransactionModalInnerContainer fullscreen bottomSheetViewStyles={bottomSheetViewStyles}>
      {!hideContent && (
        <>
          <Spacer size="$spacing12" />
          <RecipientSelect
            chainId={derivedSendInfo.chainId as UniverseChainId}
            recipient={recipient}
            onHideRecipientSelector={onHideRecipientSelector}
            onSelectRecipient={onSelectRecipient}
          />
        </>
      )}
    </TransactionModalInnerContainer>
  )
}
