import { SearchHistoryResult } from '@luxexchange/lx/src/features/search/SearchHistoryResult'
import { LuxState } from '@luxexchange/lx/src/state/luxReducer'

export const selectSearchHistory = (state: LuxState): SearchHistoryResult[] => {
  return state.searchHistory.results
}
