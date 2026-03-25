import { isBetaEnv, isProdEnv } from '@luxfi/utilities/src/environment/env'
import { isWebApp } from '@luxfi/utilities/src/platform'

export enum StatsigEnvName {
  Beta = 'beta', // mobile and extension environment-specific
  Development = 'development',
  Production = 'production',
  Staging = 'staging', // interface (web) environment-specific
}

export function getStatsigEnvName(): StatsigEnvName {
  if (isBetaEnv()) {
    return isWebApp ? StatsigEnvName.Staging : StatsigEnvName.Beta
  }
  if (isProdEnv()) {
    return StatsigEnvName.Production
  }
  return StatsigEnvName.Development
}
