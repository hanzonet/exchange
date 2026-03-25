import { TradingApiClient } from '@luxexchange/lx/src/data/apiClients/tradingApi/TradingApiClient'
import {
  createTradeRepository,
  type TradeRepository,
} from '@luxexchange/lx/src/features/transactions/swap/services/tradeService/tradeRepository'
import { logger } from '@luxfi/utilities/src/logger/logger'

/**
 * Repositories
 *
 * This is where we _create_ instances of repositories that are used in services/hooks/etc.
 *
 * List of repositories:
 * - Trade Repository (formerly Quote Repository)
 */

/**
 * Trade Repository
 *
 * @returns A trade repository that can be used to fetch quotes from the trading API.
 */
export function getEVMTradeRepository(): TradeRepository {
  return createTradeRepository({
    fetchQuote: TradingApiClient.fetchQuote,
    fetchIndicativeQuote: TradingApiClient.fetchIndicativeQuote,
    logger,
  })
}
