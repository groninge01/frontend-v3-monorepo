'use client'

import {
  isNotSupported,
  shouldBlockAddLiquidity,
} from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.helpers'
import { usePool } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/PoolProvider'
import { RelayerSignatureProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/relayer/RelayerSignatureProvider'
import { TokenInputsValidationProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokenInputsValidationProvider'
import { PriceImpactProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/price-impact/PriceImpactProvider'
import { Alert } from '@chakra-ui/react'
import { TransactionStateProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'
import { PropsWithChildren } from 'react'
import { isHash } from 'viem'
import { usePoolRedirect } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.hooks'
import { DefaultPageContainer } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/containers/DefaultPageContainer'
import { AddLiquidityProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/add-liquidity/AddLiquidityProvider'

type Props = PropsWithChildren<{
  params: { txHash?: string[] }
}>

export default function AddLiquidityLayout({ params: { txHash }, children }: Props) {
  const { pool } = usePool()
  const { redirectToPoolPage } = usePoolRedirect(pool)

  const maybeTxHash = txHash?.[0] || ''
  const urlTxHash = isHash(maybeTxHash) ? maybeTxHash : undefined

  if (shouldBlockAddLiquidity(pool)) {
    return redirectToPoolPage()
  }

  if (isNotSupported(pool)) {
    return (
      <Alert status="info" w="fit-content" minW="50%">
        This pool type is not currently supported in the Balancer V3 UI
      </Alert>
    )
  }

  return (
    <DefaultPageContainer>
      <TransactionStateProvider>
        <RelayerSignatureProvider>
          <TokenInputsValidationProvider>
            <AddLiquidityProvider urlTxHash={urlTxHash}>
              <PriceImpactProvider>{children}</PriceImpactProvider>
            </AddLiquidityProvider>
          </TokenInputsValidationProvider>
        </RelayerSignatureProvider>
      </TransactionStateProvider>
    </DefaultPageContainer>
  )
}
