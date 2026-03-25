import { combineReducers } from 'redux'
import { appearanceSettingsReducer } from '@luxexchange/lx/src/features/appearance/slice'
import { luxBehaviorHistoryReducer } from '@luxexchange/lx/src/features/behaviorHistory/slice'
import { favoritesReducer } from '@luxexchange/lx/src/features/favorites/slice'
import { fiatOnRampAggregatorApi } from '@luxexchange/lx/src/features/fiatOnRamp/api'
import { notificationReducer } from '@luxexchange/lx/src/features/notifications/slice/slice'
import { portfolioReducer } from '@luxexchange/lx/src/features/portfolio/slice/slice'
import { searchHistoryReducer } from '@luxexchange/lx/src/features/search/searchHistorySlice'
import { userSettingsReducer } from '@luxexchange/lx/src/features/settings/slice'
import { delegationReducer } from '@luxexchange/lx/src/features/smartWallet/delegation/slice'
import { timingReducer } from '@luxexchange/lx/src/features/timing/slice'
import { tokensReducer } from '@luxexchange/lx/src/features/tokens/warnings/slice/slice'
import { transactionReducer } from '@luxexchange/lx/src/features/transactions/slice'
import { swapSettingsReducer } from '@luxexchange/lx/src/features/transactions/swap/state/slice'
import { visibilityReducer } from '@luxexchange/lx/src/features/visibility/slice'

export const luxReducers = {
  [fiatOnRampAggregatorApi.reducerPath]: fiatOnRampAggregatorApi.reducer,
  appearanceSettings: appearanceSettingsReducer,
  swapSettings: swapSettingsReducer,
  favorites: favoritesReducer,
  notifications: notificationReducer,
  portfolio: portfolioReducer,
  searchHistory: searchHistoryReducer,
  timing: timingReducer,
  tokens: tokensReducer,
  transactions: transactionReducer,
  luxBehaviorHistory: luxBehaviorHistoryReducer,
  userSettings: userSettingsReducer,
  visibility: visibilityReducer,
  delegation: delegationReducer,
} as const

// used to type RootState
export const luxReducer = combineReducers(luxReducers)

export const luxPersistedStateList: Array<keyof typeof luxReducers> = [
  'favorites',
  'portfolio',
  'searchHistory',
  'tokens',
  'transactions',
  'luxBehaviorHistory',
  'userSettings',
  'visibility',
]

export type LuxState = ReturnType<typeof luxReducer>
