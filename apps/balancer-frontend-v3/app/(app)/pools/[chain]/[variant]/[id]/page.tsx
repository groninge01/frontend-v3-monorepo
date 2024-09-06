import { PoolDetail } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/PoolDetail/PoolDetail'
import { TransactionStateProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'

export default function PoolPage() {
  return (
    <TransactionStateProvider>
      <PoolDetail />
    </TransactionStateProvider>
  )
}
