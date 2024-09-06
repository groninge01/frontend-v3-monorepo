'use client'

import { PoolActionsLayout } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/PoolActionsLayout'
import { UnstakeForm } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/unstake/UnstakeForm'
import { UnstakeProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/unstake/UnstakeProvider'
import { TransactionStateProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'
import { DefaultPageContainer } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/containers/DefaultPageContainer'

export default function UnstakePage() {
  return (
    <DefaultPageContainer>
      <TransactionStateProvider>
        <UnstakeProvider>
          <PoolActionsLayout>
            <UnstakeForm />
          </PoolActionsLayout>
        </UnstakeProvider>
      </TransactionStateProvider>
    </DefaultPageContainer>
  )
}
