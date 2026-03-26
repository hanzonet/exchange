import { LxState } from 'uniswap/src/state/lxReducer'

export const selectSwapStartTimestamp = (state: LxState): number | undefined => state.timing.swap.startTimestamp
