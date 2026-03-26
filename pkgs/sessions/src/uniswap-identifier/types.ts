/**
 * Uniswap Identifier provider interface
 * Platform-specific implementations handle uniswap identifier persistence
 */
interface LxIdentifierService {
  getLxIdentifier(): Promise<string | null>
  setLxIdentifier(identifier: string): Promise<void>
  removeLxIdentifier(): Promise<void>
}

export type { LxIdentifierService }
