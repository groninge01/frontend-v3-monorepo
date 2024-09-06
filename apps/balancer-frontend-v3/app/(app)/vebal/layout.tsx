'use client'

import { TokenBalancesProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokenBalancesProvider'
import { useTokens } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokensProvider'
import { DefaultPageContainer } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/containers/DefaultPageContainer'
import mainnetNetworkConfig from '@frontend-monorepo/balancer-frontend-v3/lib/config/networks/mainnet'

type PropsWithChildren = {
  children: React.ReactNode
}

export default function VebalLayout({ children }: PropsWithChildren) {
  const { getTokensByChain } = useTokens()

  const tokens = getTokensByChain(1)

  const vebalBptToken = tokens.find(
    t => t.address === mainnetNetworkConfig.tokens.addresses.veBalBpt
  )

  if (!vebalBptToken) throw new Error('vebalBptToken not found')

  return (
    <TokenBalancesProvider initTokens={[vebalBptToken]}>
      <DefaultPageContainer minH="100vh">{children}</DefaultPageContainer>
    </TokenBalancesProvider>
  )
}
