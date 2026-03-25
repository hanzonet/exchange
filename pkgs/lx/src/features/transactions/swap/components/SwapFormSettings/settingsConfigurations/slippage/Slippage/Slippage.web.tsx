import { Slippage as SlippageBase } from '@luxexchange/lx/src/features/transactions/components/settings/settingsConfigurations/slippage/Slippage/Slippage.web'
import { type TransactionSettingConfig } from '@luxexchange/lx/src/features/transactions/components/settings/types'
import { SlippageControl } from '@luxexchange/lx/src/features/transactions/swap/components/SwapFormSettings/settingsConfigurations/slippage/SlippageControl/SlippageControl'

export const Slippage: TransactionSettingConfig = {
  ...SlippageBase,
  Control() {
    return <SlippageControl saveOnBlur={false} />
  },
}
