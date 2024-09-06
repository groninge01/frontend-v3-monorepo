'use client'

import {
  ChainSlug,
  slugToChainMap,
} from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.utils'
import { SwapProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/swap/SwapProvider'
import { TokenBalancesProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokenBalancesProvider'
import { TokenInputsValidationProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokenInputsValidationProvider'
import { useTokens } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokensProvider'
import { TransactionStateProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'
import { GqlChain } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { PropsWithChildren } from 'react'
import { PriceImpactProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/price-impact/PriceImpactProvider'
import { DefaultPageContainer } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/containers/DefaultPageContainer'
import { getSwapPathParams } from './getSwapPathParams'
import { RelayerSignatureProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/relayer/RelayerSignatureProvider'

type Props = PropsWithChildren<{
  params: { slug?: string[] }
}>

export default function SwapLayout({ params: { slug }, children }: Props) {
  const pathParams = getSwapPathParams(slug)

  const { getTokensByChain } = useTokens()
  const initChain = pathParams.chain
    ? slugToChainMap[pathParams.chain as ChainSlug]
    : GqlChain.Mainnet
  const initTokens = getTokensByChain(initChain)

  return (
    <DefaultPageContainer minH="100vh">
      <TransactionStateProvider>
        <RelayerSignatureProvider>
          <TokenInputsValidationProvider>
            <TokenBalancesProvider initTokens={initTokens}>
              <PriceImpactProvider>
                <SwapProvider pathParams={{ ...pathParams }}>{children}</SwapProvider>
              </PriceImpactProvider>
            </TokenBalancesProvider>
          </TokenInputsValidationProvider>
        </RelayerSignatureProvider>
      </TransactionStateProvider>
    </DefaultPageContainer>
  )
}
