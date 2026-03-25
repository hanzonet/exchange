import { LuxState } from '@luxexchange/lx/src/state/luxReducer'

export const selectSwapStartTimestamp = (state: LuxState): number | undefined => state.timing.swap.startTimestamp
