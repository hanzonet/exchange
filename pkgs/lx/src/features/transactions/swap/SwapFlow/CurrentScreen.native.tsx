import { useFocusEffect } from '@react-navigation/core'
import { SectionName } from '@luxexchange/lx/src/features/telemetry/constants'
import Trace from '@luxexchange/lx/src/features/telemetry/Trace'
import type { TransactionSettingConfig } from '@luxexchange/lx/src/features/transactions/components/settings/types'
import { TransactionModalFooterContainer } from '@luxexchange/lx/src/features/transactions/components/TransactionModal/TransactionModal'
import {
  TransactionScreen,
  useTransactionModalContext,
} from '@luxexchange/lx/src/features/transactions/components/TransactionModal/TransactionModalContext'
import { SwapFormButton } from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormButton/SwapFormButton'
import { UnichainInstantBalanceModal } from '@luxexchange/lx/src/features/transactions/swap/components/UnichainInstantBalanceModal/UnichainInstantBalanceModal'
import { SwapFormScreen } from '@luxexchange/lx/src/features/transactions/swap/form/SwapFormScreen/SwapFormScreen'
import { SwapFormWarningModals } from '@luxexchange/lx/src/features/transactions/swap/form/SwapFormScreen/SwapFormWarningModals/SwapFormWarningModals'
import { SwapFormWarningStoreContextProvider } from '@luxexchange/lx/src/features/transactions/swap/form/stores/swapFormWarningStore/SwapFormWarningStoreContextProvider'
import { SwapReviewScreen } from '@luxexchange/lx/src/features/transactions/swap/review/SwapReviewScreen/SwapReviewScreen'
import { useDelayedRender } from '@luxfi/utilities/src/react/useDelayedRender'

export function CurrentScreen({
  settings,
  onSubmitSwap,
}: {
  settings: TransactionSettingConfig[]
  onSubmitSwap?: () => Promise<void> | void
  tokenColor?: string
}): JSX.Element {
  const { screen } = useTransactionModalContext()

  switch (screen) {
    case TransactionScreen.Form:
      return (
        <Trace logImpression section={SectionName.SwapForm}>
          <SwapFormScreenDelayedRender settings={settings} />
          <TransactionModalFooterContainer>
            <SwapFormWarningStoreContextProvider>
              <SwapFormButton />
              <SwapFormWarningModals />
            </SwapFormWarningStoreContextProvider>
          </TransactionModalFooterContainer>
        </Trace>
      )
    case TransactionScreen.Review:
    case TransactionScreen.UnichainInstantBalance:
      return (
        <>
          <Trace logImpression section={SectionName.SwapReview}>
            <SwapReviewScreenDelayedRender onSubmitSwap={onSubmitSwap} />
          </Trace>
          {screen === TransactionScreen.UnichainInstantBalance && <UnichainInstantBalanceModal />}
        </>
      )
  }
}

// Please verify this on both an Android and iOS physical device before changing these values.
const SWAP_FORM_SCREEN_TRANSITION_DELAY = 75
const SWAP_REVIEW_SCREEN_TRANSITION_DELAY = 450

// We add a short hardcoded delay to allow the sheet to animate quickly both on first render and when going back from Review -> Form.
function SwapFormScreenDelayedRender({ settings }: { settings: TransactionSettingConfig[] }): JSX.Element {
  const { isContentHidden } = useDelayedRender(SWAP_FORM_SCREEN_TRANSITION_DELAY)

  return <SwapFormScreen settings={settings} hideContent={isContentHidden} focusHook={useFocusEffect} />
}

// We add a short hardcoded delay to allow the sheet to animate quickly when going from Form -> Review.
function SwapReviewScreenDelayedRender({ onSubmitSwap }: { onSubmitSwap?: () => Promise<void> | void }): JSX.Element {
  const { isContentHidden } = useDelayedRender(SWAP_REVIEW_SCREEN_TRANSITION_DELAY)

  return <SwapReviewScreen hideContent={isContentHidden} onSubmitSwap={onSubmitSwap} />
}
