import { useMemo } from 'react'
import { useFiatOnRampAggregatorTransferServiceProvidersQuery } from '@luxexchange/lx/src/features/fiatOnRamp/hooks/useFiatOnRampQueries'
import { FORServiceProvider } from '@luxexchange/lx/src/features/fiatOnRamp/types'

export function useCexTransferProviders(params?: { isDisabled?: boolean }): FORServiceProvider[] {
  const { data } = useFiatOnRampAggregatorTransferServiceProvidersQuery(undefined, {
    skip: params?.isDisabled,
  })

  return useMemo(() => {
    if (!data) {
      return []
    }

    return data.serviceProviders
  }, [data])
}
