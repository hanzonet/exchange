import { SearchHistoryResult } from 'uniswap/src/features/search/SearchHistoryResult'
import { LxState } from 'uniswap/src/state/lxReducer'

export const selectSearchHistory = (state: LxState): SearchHistoryResult[] => {
  return state.searchHistory.results
}
