/**
 * Apollo Global Data Provider
 *
 * This component is used to fetch data that is needed for the entire
 * application during the RSC render pass. The data is then passed to the client
 * providers that should then call `useSeedApolloCache` to seed the apollo cache
 * prior to the useQuery call, ensuring the data is already present on the first
 * client render pass.
 */
import { getApolloServerClient } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/apollo-server.client'
import {
  GetTokenPricesDocument,
  GetTokensDocument,
} from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { getProjectConfig } from '@frontend-monorepo/balancer-frontend-v3/lib/config/getProjectConfig'
import { TokensProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokensProvider'
import { FiatFxRatesProvider } from '../../hooks/FxRatesProvider'
import { getFxRates } from '../../utils/currencies'
import { getPoolCategories } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/categories/getPoolCategories'
import { PoolCategoriesProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/categories/PoolCategoriesProvider'
import { mins } from '../../utils/time'

export const revalidate = 60

export async function ApolloGlobalDataProvider({ children }: React.PropsWithChildren) {
  const client = getApolloServerClient()

  const tokensQueryVariables = {
    chains: getProjectConfig().supportedNetworks,
  }

  const { data: tokensQueryData } = await client.query({
    query: GetTokensDocument,
    variables: tokensQueryVariables,
    context: {
      fetchOptions: {
        next: { revalidate: mins(20).toSecs() },
      },
    },
  })

  const { data: tokenPricesQueryData } = await client.query({
    query: GetTokenPricesDocument,
    variables: {
      chains: getProjectConfig().supportedNetworks,
    },
    context: {
      fetchOptions: {
        next: { revalidate: mins(10).toSecs() },
      },
    },
  })

  const exchangeRates = await getFxRates()
  const poolCategories = await getPoolCategories()

  return (
    <TokensProvider
      tokensData={tokensQueryData}
      tokenPricesData={tokenPricesQueryData}
      variables={tokensQueryVariables}
    >
      <FiatFxRatesProvider data={exchangeRates}>
        <PoolCategoriesProvider data={poolCategories}>{children}</PoolCategoriesProvider>
      </FiatFxRatesProvider>
    </TokensProvider>
  )
}
