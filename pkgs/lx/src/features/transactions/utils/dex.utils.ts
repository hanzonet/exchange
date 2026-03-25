export function isUniswapXOrderPending(_tx: { status?: string }): boolean {
  return _tx?.status === 'pending'
}
