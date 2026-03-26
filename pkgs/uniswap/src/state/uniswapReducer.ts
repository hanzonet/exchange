import { combineReducers } from 'redux'
import { appearanceSettingsReducer } from 'uniswap/src/features/appearance/slice'
import { lxBehaviorHistoryReducer } from 'uniswap/src/features/behaviorHistory/slice'
import { favoritesReducer } from 'uniswap/src/features/favorites/slice'
import { notificationReducer } from 'uniswap/src/features/notifications/slice/slice'
import { portfolioReducer } from 'uniswap/src/features/portfolio/slice/slice'
import { searchHistoryReducer } from 'uniswap/src/features/search/searchHistorySlice'
import { userSettingsReducer } from 'uniswap/src/features/settings/slice'
import { delegationReducer } from 'uniswap/src/features/smartWallet/delegation/slice'
import { timingReducer } from 'uniswap/src/features/timing/slice'
import { tokensReducer } from 'uniswap/src/features/tokens/warnings/slice/slice'
import { transactionReducer } from 'uniswap/src/features/transactions/slice'
import { swapSettingsReducer } from 'uniswap/src/features/transactions/swap/state/slice'
import { visibilityReducer } from 'uniswap/src/features/visibility/slice'

export const lxReducers = {
  appearanceSettings: appearanceSettingsReducer,
  swapSettings: swapSettingsReducer,
  favorites: favoritesReducer,
  notifications: notificationReducer,
  portfolio: portfolioReducer,
  searchHistory: searchHistoryReducer,
  timing: timingReducer,
  tokens: tokensReducer,
  transactions: transactionReducer,
  lxBehaviorHistory: lxBehaviorHistoryReducer,
  userSettings: userSettingsReducer,
  visibility: visibilityReducer,
  delegation: delegationReducer,
} as const

// used to type RootState
export const lxReducer = combineReducers(lxReducers)

export const lxPersistedStateList: Array<keyof typeof lxReducers> = [
  'appearanceSettings',
  'favorites',
  'portfolio',
  'searchHistory',
  'tokens',
  'transactions',
  'lxBehaviorHistory',
  'userSettings',
  'visibility',
]

export type LxState = ReturnType<typeof lxReducer>
