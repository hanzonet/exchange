import type { Currency, CurrencyAmount } from '@luxfi/amm-core'
import { useCallback } from 'react'
import { Flex, Text } from '@luxfi/ui/src'
import { spacing } from '@luxfi/ui/src/theme/spacing'
import {
  AmountInputPresets,
  PRESET_BUTTON_PROPS,
} from '@luxexchange/lx/src/components/CurrencyInputPanel/AmountInputPresets/AmountInputPresets'
import { PresetAmountButton } from '@luxexchange/lx/src/components/CurrencyInputPanel/AmountInputPresets/PresetAmountButton'
import type { PresetPercentage } from '@luxexchange/lx/src/components/CurrencyInputPanel/AmountInputPresets/types'
import { PRESET_PERCENTAGES } from '@luxexchange/lx/src/components/CurrencyInputPanel/AmountInputPresets/utils'
import { DefaultTokenOptions } from '@luxexchange/lx/src/components/CurrencyInputPanel/DefaultTokenOptions/DefaultTokenOptions'
import { TokenRate } from '@luxexchange/lx/src/components/CurrencyInputPanel/TokenRate'
import type { CurrencyInfo } from '@luxexchange/lx/src/features/dataApi/types'
import { ElementName } from '@luxexchange/lx/src/features/telemetry/constants'
import { usePriceUXEnabled } from '@luxexchange/lx/src/features/transactions/swap/hooks/usePriceUXEnabled'
import { CurrencyField } from '@luxexchange/lx/src/types/currency'
import { isExtensionApp, isWebAppDesktop, isWebPlatform } from '@luxfi/utilities/src/platform'

interface CurrencyInputPanelHeaderProps {
  headerLabel?: string
  currencyField: CurrencyField
  currencyBalance: Maybe<CurrencyAmount<Currency>>
  currencyAmount: Maybe<CurrencyAmount<Currency>>
  currencyInfo: Maybe<CurrencyInfo>
  onSetPresetValue: (amount: string, percentage: PresetPercentage) => void
  showDefaultTokenOptions: boolean
  hidePresets?: boolean
}

export function CurrencyInputPanelHeader({
  headerLabel,
  currencyField,
  currencyBalance,
  currencyAmount,
  currencyInfo,
  onSetPresetValue,
  showDefaultTokenOptions,
  hidePresets,
}: CurrencyInputPanelHeaderProps): JSX.Element | null {
  const priceUXEnabled = usePriceUXEnabled()

  const isOutput = currencyField === CurrencyField.OUTPUT
  const showFlippableRate = priceUXEnabled && isOutput && !!currencyInfo

  const renderPreset = useCallback(
    (preset: PresetPercentage) => (
      <PresetAmountButton
        percentage={preset}
        currencyAmount={currencyAmount}
        currencyBalance={currencyBalance}
        currencyField={currencyField}
        elementName={ElementName.PresetPercentage}
        buttonProps={PRESET_BUTTON_PROPS}
        onSetPresetValue={onSetPresetValue}
      />
    ),
    [currencyAmount, currencyBalance, currencyField, onSetPresetValue],
  )

  if (!headerLabel && !showDefaultTokenOptions) {
    return null
  }

  const showInputPresets =
    (isWebAppDesktop || isExtensionApp) && !hidePresets && currencyField === CurrencyField.INPUT && currencyBalance

  return (
    <Flex row justifyContent="space-between">
      {/* IMPORTANT: $micro crashes on mobile */}
      <Text color="$neutral2" variant="subheading2" fontSize={isWebPlatform ? '$micro' : '$small'}>
        {headerLabel}
      </Text>
      {showInputPresets && (
        <Flex position="absolute" right={0} top={-spacing.spacing2}>
          <AmountInputPresets presets={PRESET_PERCENTAGES} renderPreset={renderPreset} />
        </Flex>
      )}
      {showDefaultTokenOptions && isWebAppDesktop && (
        <Flex position="absolute" right={0} top={-spacing.spacing6}>
          <DefaultTokenOptions currencyField={CurrencyField.OUTPUT} />
        </Flex>
      )}
      {showFlippableRate && isWebAppDesktop && <TokenRate />}
    </Flex>
  )
}
