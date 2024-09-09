/* eslint-disable max-len */
import { FetchPoolProps } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.types'
import {
  ChainSlug,
  getPoolTypeLabel,
  slugToChainMap,
} from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.utils'
import { PropsWithChildren, Suspense } from 'react'
import { PoolDetailSkeleton } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/PoolDetail/PoolDetailSkeleton'
import { GetPoolDocument } from '@frontend-monorepo/api'
import { Metadata } from 'next'
import { Box } from '@chakra-ui/react'
import { PoolProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/PoolProvider'
import { getProjectConfig } from '@frontend-monorepo/balancer-frontend-v3/lib/config/getProjectConfig'
import { arrayToSentence } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/utils/strings'
import { getApolloServerClient } from '@frontend-monorepo/balancer-frontend-v3/lib/config/apollo/apollo-server.client'

type Props = PropsWithChildren<{
  params: Omit<FetchPoolProps, 'chain'> & { chain: ChainSlug }
}>

const { projectName } = getProjectConfig()

async function getPoolQuery(chain: ChainSlug, id: string) {
  const _chain = slugToChainMap[chain]
  const variables = { id: id.toLowerCase(), chain: _chain }

  return await getApolloServerClient().query({
    query: GetPoolDocument,
    variables,
    context: {
      fetchOptions: {
        next: { revalidate: 30 },
      },
    },
  })
}

export async function generateMetadata({
  params: { id, chain, variant },
}: Props): Promise<Metadata> {
  const {
    data: { pool },
  } = await getPoolQuery(chain, id)

  if (!pool) return {}

  const poolTokenString = arrayToSentence(pool.displayTokens.map(token => token.symbol))

  return {
    title: `Liquidity Pool (${variant}): ${pool.name}`,
    description: `${pool.symbol} is a ${projectName} ${variant} ${getPoolTypeLabel(
      pool.type
    )} liquidity pool which contains ${poolTokenString}.`,
  }
}

export default async function PoolLayout({ params: { id, chain, variant }, children }: Props) {
  const _chain = slugToChainMap[chain]

  const { data } = await getPoolQuery(chain, id)

  if (!data.pool) {
    return <Box>Pool with id not found ({id})</Box>
  }

  return (
    <Suspense fallback={<PoolDetailSkeleton />}>
      <PoolProvider id={id} chain={_chain} variant={variant} data={data}>
        {children}
      </PoolProvider>
    </Suspense>
  )
}
