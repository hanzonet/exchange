import { Language } from 'uniswap/src/features/language/constants'
import { deviceAccessTimeoutToMinutes } from 'uniswap/src/features/settings/constants'
import { LxState } from 'uniswap/src/state/lxReducer'

export const selectWalletHideSmallBalancesSetting = (state: LxState): boolean =>
  state.userSettings.hideSmallBalances

export const selectWalletHideSpamTokensSetting = (state: LxState): boolean => state.userSettings.hideSpamTokens

export const selectWalletHideReportedActivitySetting = (state: LxState): boolean =>
  state.userSettings.hideReportedActivity ?? true

export const selectCurrentLanguage = (state: LxState): Language => state.userSettings.currentLanguage

export const selectIsTestnetModeEnabled = (state: LxState): boolean =>
  state.userSettings.isTestnetModeEnabled ?? false

export const selectDeviceAccessTimeoutMinutes = (state: LxState): number | undefined =>
  deviceAccessTimeoutToMinutes(state.userSettings.deviceAccessTimeout)
