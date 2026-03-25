import { createPromiseClient } from '@connectrpc/connect'
import { AuctionService } from '@uniswap/client-data-api/dist/data/v1/auction_connect'
import { createAuctionServiceClient } from '@luxexchange/api'
import { auctionsTransport } from '@luxexchange/lx/src/data/rest/auctions/base'

export const AuctionServiceClient = createAuctionServiceClient({
  rpcClient: createPromiseClient(AuctionService, auctionsTransport),
})
