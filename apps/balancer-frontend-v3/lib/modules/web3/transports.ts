'use client'

import { Chain } from '@rainbow-me/rainbowkit'
import { fallback, http } from 'wagmi'
import { getGqlChain } from '@frontend-monorepo/balancer-frontend-v3/lib/config/app.config'
import { SupportedChainId } from '@frontend-monorepo/balancer-frontend-v3/lib/config/config.types'

import { chains, rpcFallbacks, rpcOverrides } from './ChainConfig'
export function getTransports(chain: Chain) {
  const gqlChain = getGqlChain(chain.id as SupportedChainId)
  const overrideRpcUrl = rpcOverrides[gqlChain]
  const fallbackRpcUrl = rpcFallbacks[gqlChain]
  if (overrideRpcUrl) return fallback([http(overrideRpcUrl), http(fallbackRpcUrl), http()])
  return fallback([http(), http(fallbackRpcUrl)])
}

export const transports = Object.fromEntries(
  chains.map(chain => [chain.id, getTransports(chain)])
) as Record<number, ReturnType<typeof getTransports>>
