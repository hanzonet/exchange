export function isDEXOrderPending(_tx: { status?: string }): boolean {
  return _tx?.status === 'pending'
}
