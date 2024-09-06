'use client'

import { PoolActionsLayout } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/PoolActionsLayout'
import { MigrateStakeForm } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/migrateStake/MigrateStakeForm'
import { MigrateStakeProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/migrateStake/MigrateStakeProvider'
import { UnstakeProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/unstake/UnstakeProvider'
import { TransactionStateProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'

export default function MigrateStakePage() {
  return (
    <TransactionStateProvider>
      <UnstakeProvider>
        <MigrateStakeProvider>
          <PoolActionsLayout>
            <MigrateStakeForm />
          </PoolActionsLayout>
        </MigrateStakeProvider>
      </UnstakeProvider>
    </TransactionStateProvider>
  )
}
