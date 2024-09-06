import { GetAppGlobalPollingDataQuery } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { fakeTokenBySymbol } from '@frontend-monorepo/balancer-frontend-v3/test/data/all-gql-tokens.fake'
import { aGqlTokenPriceMock } from '@frontend-monorepo/balancer-frontend-v3/test/msw/builders/gqlTokenPrice.builders'

export function anAppGlobalData(options?: Partial<GetAppGlobalPollingDataQuery>) {
  const defaultAppGlobalData: GetAppGlobalPollingDataQuery = {
    __typename: 'Query',
    blocksGetAverageBlockTime: 1000,
    blocksGetBlocksPerDay: 100,
    tokenGetCurrentPrices: [
      aGqlTokenPriceMock({ address: fakeTokenBySymbol('ETH').address }),
      aGqlTokenPriceMock({ address: fakeTokenBySymbol('BAL').address }),
    ],
    protocolMetricsChain: {
      __typename: 'GqlProtocolMetricsChain',
      swapFee24h: 'test fee',
      swapVolume24h: 'test volume 24h',
      totalSwapVolume: 'test volume',
      poolCount: '24',
      totalLiquidity: 'test liquidity',
      totalSwapFee: 'test fee',
    },
  }
  return Object.assign({}, defaultAppGlobalData, options)
}
