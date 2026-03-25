import { useEffect } from 'react'
import type { ColorTokens, FlexProps } from '@luxfi/ui/src'
import type { IconSizeTokens } from '@luxfi/ui/src/theme'
import { useTransactionSettingsWithSlippage } from '@luxexchange/lx/src/features/transactions/components/settings/hooks/useTransactionSettingsWithSlippage'
import { Slippage } from '@luxexchange/lx/src/features/transactions/components/settings/settingsConfigurations/slippage/Slippage/Slippage'
import { useSlippageSettings } from '@luxexchange/lx/src/features/transactions/components/settings/settingsConfigurations/slippage/useSlippageSettings'
import {
  type ModalIdWithSlippage,
  TransactionSettingsModalId,
} from '@luxexchange/lx/src/features/transactions/components/settings/stores/TransactionSettingsModalStore/createTransactionSettingsModalStore'
import { TransactionSettingsModalStoreContextProvider } from '@luxexchange/lx/src/features/transactions/components/settings/stores/TransactionSettingsModalStore/TransactionSettingsModalStoreContextProvider'
import { useSetTransactionSettingsAutoSlippageTolerance } from '@luxexchange/lx/src/features/transactions/components/settings/stores/transactionSettingsStore/useTransactionSettingsStore'
import { TransactionSettings as BaseTransactionSettings } from '@luxexchange/lx/src/features/transactions/components/settings/TransactionSettings'
import { TransactionSettingsButtonWithSlippage } from '@luxexchange/lx/src/features/transactions/components/settings/TransactionSettingsButtonWithSlippage'
import type { TransactionSettingConfig } from '@luxexchange/lx/src/features/transactions/components/settings/types'
import { getShouldSettingApplyToRouting } from '@luxexchange/lx/src/features/transactions/components/settings/utils'
import SlippageWarningModal from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormSettings/SlippageWarningModal'
import { useSwapFormStoreDerivedSwapInfo } from '@luxexchange/lx/src/features/transactions/swap/stores/swapFormStore/useSwapFormStore'
import { TestID } from '@luxexchange/lx/src/test/fixtures/testIDs'

interface SwapFormSettingsProps {
  settings: TransactionSettingConfig[]
  adjustTopAlignment?: boolean
  adjustRightAlignment?: boolean
  position?: FlexProps['position']
  iconColor?: ColorTokens
  iconSize?: IconSizeTokens
  defaultTitle?: string
  isZeroSlippage?: boolean
}

const customModalIds: ModalIdWithSlippage[] = [TransactionSettingsModalId.SlippageWarning]

export function SwapFormSettings(props: SwapFormSettingsProps): JSX.Element {
  const setAutoSlippageTolerance = useSetTransactionSettingsAutoSlippageTolerance()
  const slippageTolerance = useSwapFormStoreDerivedSwapInfo((s) => {
    if (!getShouldSettingApplyToRouting(Slippage, s.trade.trade?.routing)) {
      return 0
    }
    return s.trade.trade?.slippageTolerance ?? s.trade.indicativeTrade?.slippageTolerance
  })

  useEffect(() => {
    setAutoSlippageTolerance(slippageTolerance)
  }, [slippageTolerance, setAutoSlippageTolerance])

  return (
    <TransactionSettingsModalStoreContextProvider<ModalIdWithSlippage> modalIds={customModalIds}>
      <SwapFormSettingsInner {...props} />
    </TransactionSettingsModalStoreContextProvider>
  )
}

export function SwapFormSettingsInner({
  settings,
  adjustTopAlignment = true,
  adjustRightAlignment = true,
  position = 'absolute',
  iconColor = '$neutral2',
  iconSize,
  defaultTitle,
  isZeroSlippage,
}: SwapFormSettingsProps): JSX.Element {
  const { isSlippageWarningModalVisible, handleHideSlippageWarningModalWithSeen, onCloseSettingsModal } =
    useTransactionSettingsWithSlippage()
  const { autoSlippageTolerance } = useSlippageSettings()

  return (
    <>
      <SlippageWarningModal isOpen={isSlippageWarningModalVisible} onClose={handleHideSlippageWarningModalWithSeen} />
      <BaseTransactionSettings
        settings={settings}
        adjustTopAlignment={adjustTopAlignment}
        adjustRightAlignment={adjustRightAlignment}
        position={position}
        iconColor={iconColor}
        iconSize={iconSize}
        defaultTitle={defaultTitle}
        testID={TestID.SwapSettings}
        CustomSettingsButton={
          <TransactionSettingsButtonWithSlippage
            autoSlippageTolerance={autoSlippageTolerance}
            isZeroSlippage={isZeroSlippage}
            iconColor={iconColor}
            iconSize={iconSize}
          />
        }
        onClose={onCloseSettingsModal}
      />
    </>
  )
}
