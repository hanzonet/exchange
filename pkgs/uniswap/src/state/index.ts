import { lxReducer } from 'uniswap/src/state/lxReducer'

// Utility type to be used inside the uniswap shared package
// Apps and packages should re-define those with a more specific `AppState`
export type LxRootState = ReturnType<typeof lxReducer>
