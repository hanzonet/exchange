import { getOverrideAdapter, getStatsigEnvName, StatsigOptions } from '@luxexchange/gating'
import { luxUrls } from 'uniswap/src/constants/urls'

export const statsigBaseConfig: StatsigOptions = {
  networkConfig: { api: luxUrls.statsigProxyUrl },
  environment: {
    tier: getStatsigEnvName(),
  },
  overrideAdapter: getOverrideAdapter(),
}
