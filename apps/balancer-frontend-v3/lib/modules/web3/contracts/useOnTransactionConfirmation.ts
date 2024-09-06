import { useEffect } from 'react'
import { Address } from 'viem'
import { useRecentTransactions } from '../../transactions/RecentTransactionsProvider'
import { TransactionLabels } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/lib'
import {
  AnalyticsEvent,
  trackEvent,
} from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/fathom/Fathom'

type updateTrackedTransactionRequest = {
  labels: TransactionLabels
  status?: 'success' | 'reverted'
  hash?: Address
}

export function useOnTransactionConfirmation({
  labels,
  hash,
  status,
}: updateTrackedTransactionRequest) {
  const { updateTrackedTransaction } = useRecentTransactions()

  // on confirmation, update tx in tx cache
  useEffect(() => {
    if (hash) {
      if (status === 'reverted') {
        trackEvent(AnalyticsEvent.TransactionReverted)
        updateTrackedTransaction(hash, {
          label: labels.reverted,
          status: 'reverted',
        })
      } else {
        trackEvent(AnalyticsEvent.TransactionConfirmed)
        updateTrackedTransaction(hash, {
          label: labels.confirmed,
          status: 'confirmed',
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])
}
