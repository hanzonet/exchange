import { FlatList } from 'react-native'
import {
  PaymentMethodFilterProps,
  useEnabledPaymentMethodFilters,
  useRenderPaymentMethod,
  useTogglePaymentMethod,
} from '@luxexchange/lx/src/features/fiatOnRamp/PaymentMethodFilter/utils'
import { FORFilters } from '@luxexchange/lx/src/features/fiatOnRamp/types'
import { FiatOffRampEventName, FiatOnRampEventName } from '@luxexchange/lx/src/features/telemetry/constants'
import { sendAnalyticsEvent } from '@luxexchange/lx/src/features/telemetry/send'

export function PaymentMethodFilter({
  quotes,
  paymentMethod,
  setPaymentMethod,
  isOffRamp,
}: PaymentMethodFilterProps): JSX.Element {
  const enabledPaymentMethodFilters = useEnabledPaymentMethodFilters(quotes)
  const handleTogglePaymentMethod = useTogglePaymentMethod(paymentMethod, setPaymentMethod)
  const handleOnPress = (filter: FORFilters): void => {
    handleTogglePaymentMethod(filter)
    if (isOffRamp) {
      sendAnalyticsEvent(FiatOffRampEventName.FiatOffRampPaymentMethodFilterSelected, { paymentMethodFilter: filter })
    } else {
      sendAnalyticsEvent(FiatOnRampEventName.FiatOnRampPaymentMethodFilterSelected, { paymentMethodFilter: filter })
    }
  }
  const renderPaymentMethod = useRenderPaymentMethod(paymentMethod, handleOnPress)

  return (
    // @ts-expect-error React Native FlatList type incompatibility
    <FlatList
      horizontal
      data={enabledPaymentMethodFilters}
      renderItem={renderPaymentMethod}
      keyExtractor={(item) => item.filter}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}
    />
  )
}
