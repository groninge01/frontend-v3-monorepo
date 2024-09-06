import { getChainId } from '@frontend-monorepo/balancer-frontend-v3/lib/config/app.config'
import { GqlChain } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'

export function isMainnet(chain: GqlChain | number): boolean {
  return chain === GqlChain.Mainnet || chain === getChainId(GqlChain.Mainnet)
}

export function isNotMainnet(chain: GqlChain | number): boolean {
  return !isMainnet(chain)
}
