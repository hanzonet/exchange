import { Language } from '@luxexchange/lx/src/features/language/constants'
import { deviceAccessTimeoutToMinutes } from '@luxexchange/lx/src/features/settings/constants'
import { LuxState } from '@luxexchange/lx/src/state/luxReducer'

export const selectWalletHideSmallBalancesSetting = (state: LuxState): boolean =>
  state.userSettings.hideSmallBalances

export const selectWalletHideSpamTokensSetting = (state: LuxState): boolean => state.userSettings.hideSpamTokens

export const selectWalletHideReportedActivitySetting = (state: LuxState): boolean =>
  state.userSettings.hideReportedActivity ?? true

export const selectCurrentLanguage = (state: LuxState): Language => state.userSettings.currentLanguage

export const selectIsTestnetModeEnabled = (state: LuxState): boolean =>
  state.userSettings.isTestnetModeEnabled ?? false

export const selectDeviceAccessTimeoutMinutes = (state: LuxState): number | undefined =>
  deviceAccessTimeoutToMinutes(state.userSettings.deviceAccessTimeout)
