import { Text } from '@luxfi/ui/src'
import { iconSizes } from '@luxfi/ui/src/theme'
import { OptionItemProps } from '@luxexchange/lx/src/components/lists/items/OptionItem'
import { UnitagOption } from '@luxexchange/lx/src/components/lists/items/types'
import { WalletBaseOptionItem } from '@luxexchange/lx/src/components/lists/items/wallets/WalletBaseOptionItem'
import { AccountIcon } from '@luxexchange/lx/src/features/accounts/AccountIcon'
import { UnitagName } from '@luxexchange/lx/src/features/unitags/UnitagName'
import { sanitizeAddressText } from '@luxexchange/lx/src/utils/addresses'
import { shortenAddress } from '@luxfi/utilities/src/addresses'

type UnitagOptionItemProps = {
  unitagOption: UnitagOption
  onPress: OptionItemProps['onPress']
}

export function UnitagOptionItem({ unitagOption, onPress }: UnitagOptionItemProps): JSX.Element {
  const { address, unitag } = unitagOption

  return (
    <WalletBaseOptionItem
      option={unitagOption}
      image={<AccountIcon address={address} size={iconSizes.icon40} />}
      title={
        <UnitagName
          displayUnitagSuffix
          displayIconInline
          name={unitag}
          textProps={{ variant: 'body1', lineHeight: undefined }}
        />
      }
      subtitle={
        <Text color="$neutral2" variant="body2">
          {sanitizeAddressText(shortenAddress({ address }))}
        </Text>
      }
      onPress={onPress}
    />
  )
}
