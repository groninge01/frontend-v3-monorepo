import { PoolListProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/PoolList/PoolListProvider'
import { PoolListLayout } from './PoolListLayout'
import { GqlPoolType } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'

export async function PoolList({ fixedPoolTypes }: { fixedPoolTypes?: GqlPoolType[] }) {
  return (
    <PoolListProvider fixedPoolTypes={fixedPoolTypes}>
      <PoolListLayout />
    </PoolListProvider>
  )
}
