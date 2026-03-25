import { Flex, FlexProps } from '@luxfi/ui/src'
import {
  PaymentMethodFilterProps,
  PaymentMethodItem,
  useEnabledPaymentMethodFilters,
  useTogglePaymentMethod,
} from '@luxexchange/lx/src/features/fiatOnRamp/PaymentMethodFilter/utils'
import { FORFilters } from '@luxexchange/lx/src/features/fiatOnRamp/types'
import { FiatOffRampEventName, FiatOnRampEventName } from '@luxexchange/lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from '@luxexchange/lx/src/features/telemetry/send'

export function PaymentMethodFilter({
  paymentMethod,
  setPaymentMethod,
  isOffRamp,
  quotes,
  ...rest
}: PaymentMethodFilterProps & FlexProps): JSX.Element {
  const enabledPaymentMethodFilters = useEnabledPaymentMethodFilters(quotes)
  const handleTogglePaymentMethod: (method: FORFilters) => void = useTogglePaymentMethod(
    paymentMethod,
    setPaymentMethod,
  )
  const handleOnPress = (filter: FORFilters): void => {
    handleTogglePaymentMethod(filter)
    if (isOffRamp) {
      sendAnalyticsEvent(FiatOffRampEventName.FiatOffRampPaymentMethodFilterSelected, { paymentMethodFilter: filter })
    } else {
      sendAnalyticsEvent(FiatOnRampEventName.FiatOnRampPaymentMethodFilterSelected, { paymentMethodFilter: filter })
    }
  }

  return (
    <Flex row alignItems="center" gap="$gap8" overflow="scroll" scrollbarWidth="none" {...rest}>
      {enabledPaymentMethodFilters.map(({ filter, icon, label }) => {
        const isSelected = paymentMethod === filter

        return (
          <PaymentMethodItem
            key={filter}
            filter={filter}
            icon={icon}
            label={label}
            isSelected={isSelected}
            onPress={() => handleOnPress(filter)}
          />
        )
      })}
    </Flex>
  )
}
