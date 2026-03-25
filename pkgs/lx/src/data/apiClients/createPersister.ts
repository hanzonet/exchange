import { type Persister } from '@tanstack/react-query-persist-client'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'

export function createPersister(_key?: string): Persister {
  throw new PlatformSplitStubError('createPersister')
}
