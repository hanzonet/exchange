import { Currency } from '@luxfi/amm-core'
import { AssetType, CurrencyAsset } from '@luxexchange/lx/src/entities/assets'
import { currencyAddress } from '@luxexchange/lx/src/utils/currencyId'

export const currencyToAsset = (currency: Currency | undefined): CurrencyAsset | null => {
  if (!currency) {
    return null
  }

  return {
    address: currencyAddress(currency),
    chainId: currency.chainId,
    type: AssetType.Currency,
  }
}
