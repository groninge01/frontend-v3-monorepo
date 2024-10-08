/* eslint-disable react-hooks/exhaustive-deps */
import { ManagedSendTransactionButton } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionButton'
import { useTransactionState } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'
import {
  TransactionLabels,
  TransactionStep,
} from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/lib'
import { sentryMetaForWagmiSimulation } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/utils/query-errors'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AddLiquidityBuildQueryParams,
  useAddLiquidityBuildCallDataQuery,
} from './queries/useAddLiquidityBuildCallDataQuery'
import { usePool } from '../../PoolProvider'

export const addLiquidityStepId = 'add-liquidity'

export type AddLiquidityStepParams = AddLiquidityBuildQueryParams

export function useAddLiquidityStep(params: AddLiquidityStepParams): TransactionStep {
  const { pool, refetch: refetchPoolBalances } = usePool()
  const [isStepActivated, setIsStepActivated] = useState(false)
  const { getTransaction } = useTransactionState()

  const { simulationQuery } = params

  const buildCallDataQuery = useAddLiquidityBuildCallDataQuery({
    ...params,
    enabled: isStepActivated,
  })

  const labels: TransactionLabels = {
    init: 'Add liquidity',
    title: 'Add liquidity',
    description: `Add liquidity to ${pool.name || 'pool'}.`,
    confirming: 'Confirming add liquidity...',
    confirmed: `Liquidity added!`,
    tooltip: `Add liquidity to ${pool.name || 'pool'}.`,
    poolId: pool.id,
  }

  const gasEstimationMeta = sentryMetaForWagmiSimulation('Error in AddLiquidity gas estimation', {
    simulationQueryData: simulationQuery.data,
    buildCallQueryData: buildCallDataQuery.data,
  })

  const transaction = getTransaction(addLiquidityStepId)

  const isComplete = () => transaction?.result.isSuccess || false

  useEffect(() => {
    // simulationQuery is refetched every 30 seconds by AddLiquidityTimeout
    if (simulationQuery.data && isStepActivated) {
      buildCallDataQuery.refetch()
    }
  }, [simulationQuery.data])

  const onSuccess = useCallback(() => {
    refetchPoolBalances()
  }, [])

  return useMemo(
    () => ({
      id: addLiquidityStepId,
      stepType: 'addLiquidity',
      labels,
      isComplete,
      onActivated: () => setIsStepActivated(true),
      onDeactivated: () => setIsStepActivated(false),
      onSuccess,
      renderAction: () => (
        <ManagedSendTransactionButton
          id={addLiquidityStepId}
          labels={labels}
          txConfig={buildCallDataQuery.data}
          gasEstimationMeta={gasEstimationMeta}
        />
      ),
    }),
    [transaction, simulationQuery.data, buildCallDataQuery.data]
  )
}
