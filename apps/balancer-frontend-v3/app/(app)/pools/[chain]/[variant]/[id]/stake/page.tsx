/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { PoolActionsLayout } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/PoolActionsLayout'
import { StakeForm } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/stake/StakeForm'
import { TransactionStateProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'
import { StakeProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/stake/StakeProvider'
import { DefaultPageContainer } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/containers/DefaultPageContainer'

export default function StakePage() {
  return (
    <DefaultPageContainer>
      <TransactionStateProvider>
        <StakeProvider>
          <PoolActionsLayout>
            <StakeForm />
          </PoolActionsLayout>
        </StakeProvider>
      </TransactionStateProvider>
    </DefaultPageContainer>
  )
}
