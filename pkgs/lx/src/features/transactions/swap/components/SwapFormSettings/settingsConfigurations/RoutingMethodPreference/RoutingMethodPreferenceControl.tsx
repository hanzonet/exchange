import { useTranslation } from 'react-i18next'
import { Text } from '@luxfi/ui/src'
import { useTransactionSettingsStore } from '@luxexchange/lx/src/features/transactions/components/settings/stores/transactionSettingsStore/useTransactionSettingsStore'

export function RoutingMethodPreferenceControl(): JSX.Element {
  const { t } = useTranslation()
  const routeVia = useTransactionSettingsStore((s) => s.routeVia)

  const label =
    routeVia === 'auto'
      ? t('swap.settings.routingMethod.option.auto.title')
      : routeVia === 'amm'
        ? t('swap.settings.routingMethod.option.amm.title')
        : t('swap.settings.routingMethod.option.dexPrecompile.title')

  return (
    <Text
      color="$neutral2"
      flexWrap="wrap"
      variant="subheading2"
      $group-hover={{
        color: '$neutral2Hovered',
      }}
    >
      {label}
    </Text>
  )
}
