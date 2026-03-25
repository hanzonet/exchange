import { KeyboardInfo } from '@luxexchange/lx/src/components/modals/useBottomSheetSafeKeyboard'

export function useBottomSheetSafeKeyboard(): KeyboardInfo {
  // Not yet accounting for mWeb
  return { keyboardHeight: 0 }
}
