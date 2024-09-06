import { TransactionLabels } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/lib'
import { TransactionBundle } from './contract.types'

export type BuildTransactionLabels = (
  args?: any,
  transactionBundle?: TransactionBundle
) => TransactionLabels
