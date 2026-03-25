import { useTranslation } from 'react-i18next'
import { Flex, FlexProps, Text, TouchableArea } from '@luxfi/ui/src'
import { Wrench } from '@luxfi/ui/src/components/icons/Wrench'
// biome-ignore lint/style/noRestrictedImports: legacy import will be migrated
import { useDeviceInsets } from '@luxfi/ui/src/hooks/useDeviceInsets'
import { zIndexes } from '@luxfi/ui/src/theme'
import { useLuxContext } from '@luxexchange/lx/src/contexts/LuxContext'
import { useEnabledChains } from '@luxexchange/lx/src/features/chains/hooks/useEnabledChains'
import { TESTNET_MODE_BANNER_HEIGHT } from '@luxexchange/lx/src/features/settings/hooks'
import { isMobileApp, isWebApp, isWebPlatform } from '@luxfi/utilities/src/platform'

export function TestnetModeBanner(props: FlexProps): JSX.Element | null {
  const { isTestnetModeEnabled } = useEnabledChains()
  const { navigateToAdvancedSettings } = useLuxContext()
  const { t } = useTranslation()

  const { top } = useDeviceInsets()

  if (!isTestnetModeEnabled) {
    return null
  }

  return (
    <TouchableArea
      position={isMobileApp ? 'absolute' : 'relative'}
      top={top}
      zIndex={zIndexes.fixed}
      width={isWebApp ? 'auto' : '100%'}
      onPress={navigateToAdvancedSettings}
    >
      <Flex
        row
        centered
        p="$padding12"
        gap="$gap8"
        backgroundColor="$statusSuccess2"
        borderWidth={isWebPlatform ? '$none' : '$spacing1'}
        borderBottomWidth="$spacing1"
        height={TESTNET_MODE_BANNER_HEIGHT}
        borderStyle="dashed"
        borderColor="$surface3"
        cursor="pointer"
        {...props}
      >
        <Wrench color="$statusSuccess" size="$icon.20" />
        <Text color="$statusSuccess" variant="body3">
          {t('home.banner.testnetMode')}
        </Text>
      </Flex>
    </TouchableArea>
  )
}
