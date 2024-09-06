import { createPublicClient } from 'viem'
import { GqlChain } from '../api/generated/graphql'
import { getNetworkConfig } from '@frontend-monorepo/balancer-frontend-v3/lib/config/app.config'
import {
  chains,
  chainsByKey,
} from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/ChainConfig'
import { Chain } from 'viem'
import { getTransports } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/transports'

function getViemChain(chainId: number): Chain {
  const chain = chains.find(chain => chain.id === chainId)
  if (!chain) throw new Error('Chain not supported')
  return chain
}

export function getViemClient(chain: GqlChain) {
  const { chainId } = getNetworkConfig(chain)

  return createPublicClient({
    chain: getViemChain(chainId),
    transport: getTransports(chainsByKey[chainId]),
  })
}
