import { provideDeviceIdService } from '@luxexchange/api/src/provideDeviceIdService'
import { provideSessionStorage } from '@luxexchange/api/src/provideSessionStorage'
import { provideLuxIdentifierService } from '@luxexchange/api/src/provideLuxIdentifierService'
import { getTransport } from '@luxexchange/api/src/transport'
import {
  createNoopSessionService,
  createSessionClient,
  createSessionRepository,
  createSessionService,
  type SessionService,
  type LuxIdentifierService,
} from '@luxexchange/sessions'
import type { Logger } from '@luxfi/utilities/src/logger/logger'
import { isWebApp } from '@luxfi/utilities/src/platform'
import { REQUEST_SOURCE } from '@luxfi/utilities/src/platform/requestSource'

function provideSessionService(ctx: {
  getBaseUrl: () => string
  getIsSessionServiceEnabled: () => boolean
  getLogger?: () => Logger
  /** Optional custom LuxIdentifierService. If not provided, uses default localStorage-based service. */
  luxIdentifierService?: LuxIdentifierService
}): SessionService {
  if (!ctx.getIsSessionServiceEnabled()) {
    return createNoopSessionService()
  }
  if (isWebApp) {
    return getWebAppSessionService(ctx)
  }
  return getExtensionSessionService(ctx)
}

/**
 * In production, web won't need an explicit session service since cookies are automatically handled by the backend+browser.
 *
 * For testing, we need this since SessionService is the only backend service that has CORS configured to handle the credentials header.
 *
 * When more services are added to the Entry Gateway, we can remove this and rely on those typical requests to instantiate the cookie.
 */
function getWebAppSessionService(ctx: {
  getBaseUrl: () => string
  getLogger?: () => Logger
  luxIdentifierService?: LuxIdentifierService
}): SessionService {
  const sessionClient = createSessionClient({
    transport: getTransport({
      getBaseUrl: ctx.getBaseUrl,
      getHeaders: () => ({ 'x-request-source': REQUEST_SOURCE }),
      options: {
        credentials: 'include',
      },
    }),
  })

  const sessionRepository = createSessionRepository({ client: sessionClient, getLogger: ctx.getLogger })

  return createSessionService({
    sessionStorage: provideSessionStorage(),
    deviceIdService: provideDeviceIdService(),
    luxIdentifierService: ctx.luxIdentifierService ?? provideLuxIdentifierService(),
    sessionRepository,
  })
}

function getExtensionSessionService(ctx: {
  getBaseUrl: () => string
  getLogger?: () => Logger
  luxIdentifierService?: LuxIdentifierService
}): SessionService {
  const sessionClient = createSessionClient({
    transport: getTransport({
      getBaseUrl: ctx.getBaseUrl,
      getHeaders: () => ({ 'x-request-source': REQUEST_SOURCE }),
    }),
  })

  const sessionRepository = createSessionRepository({ client: sessionClient, getLogger: ctx.getLogger })

  return createSessionService({
    sessionStorage: provideSessionStorage(),
    deviceIdService: provideDeviceIdService(),
    luxIdentifierService: ctx.luxIdentifierService ?? provideLuxIdentifierService(),
    sessionRepository,
  })
}

export { provideSessionService }
