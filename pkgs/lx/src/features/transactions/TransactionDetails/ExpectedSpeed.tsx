import { useTranslation } from 'react-i18next'
import { UniverseChainId } from '@luxexchange/lx/src/features/chains/types'
import { useIsUnichainFlashblocksEnabled } from '@luxexchange/lx/src/features/transactions/swap/hooks/useIsUnichainFlashblocksEnabled'
import { EstimatedTime } from '@luxexchange/lx/src/features/transactions/TransactionDetails/EstimatedTime'

interface ExpectedSpeedProps {
  chainId: UniverseChainId
}

export function ExpectedSpeed({ chainId }: ExpectedSpeedProps): JSX.Element | null {
  const { t } = useTranslation()
  const isFlashblocksEnabled = useIsUnichainFlashblocksEnabled(chainId)

  if (!isFlashblocksEnabled) {
    return null
  }

  return <EstimatedTime contentText={t('swap.details.instant')} showIcon={true} />
}
