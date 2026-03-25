// TODO: Move this to `packages/lx/src/components/CurrencyInputPanel/CurrencyInputPanel.tsx`

import { memo } from 'react'
import { Flex, ScrollView } from '@luxfi/ui/src'
import { extraMarginForHoverAnimation } from '@luxexchange/lx/src/components/CurrencyInputPanel/DefaultTokenOptions/constants'
import { TokenOptions } from '@luxexchange/lx/src/components/CurrencyInputPanel/DefaultTokenOptions/TokenOptions/TokenOptions'

import { CurrencyField } from '@luxexchange/lx/src/types/currency'
import { isHoverable, isWebAppDesktop } from '@luxfi/utilities/src/platform'

function _DefaultTokenOptions({ currencyField }: { currencyField: CurrencyField }): JSX.Element {
  return (
    <ScrollView horizontal showsVerticalScrollIndicator={false}>
      <Flex
        row
        m={extraMarginForHoverAnimation}
        gap={isWebAppDesktop ? '$gap4' : '$gap8'}
        flex={1}
        {...(isHoverable
          ? {
              opacity: 0,
              transform: [{ translateY: -4 }],
              '$group-hover': { opacity: 1, transform: [{ translateY: 0 }] },
            }
          : {})}
        animation="100ms"
      >
        <TokenOptions currencyField={currencyField} />
      </Flex>
    </ScrollView>
  )
}

export const DefaultTokenOptions = memo(_DefaultTokenOptions)
