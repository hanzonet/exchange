import type { SessionService, LuxIdentifierService } from '@luxexchange/sessions'
import { PlatformSplitStubError } from '@luxfi/utilities/src/errors'
import type { Logger } from '@luxfi/utilities/src/logger/logger'

export function provideSessionService(_ctx: {
  getBaseUrl: () => string
  getIsSessionServiceEnabled: () => boolean
  getLogger?: () => Logger
  /** Optional custom LuxIdentifierService. If not provided, uses default localStorage-based service. */
  luxIdentifierService?: LuxIdentifierService
}): SessionService {
  throw new PlatformSplitStubError('provideSessionService')
}
