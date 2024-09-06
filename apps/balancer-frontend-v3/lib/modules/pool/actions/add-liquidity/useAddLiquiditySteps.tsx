/* eslint-disable react-hooks/exhaustive-deps */
import { useShouldSignRelayerApproval } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/relayer/signRelayerApproval.hooks'
import { useApproveRelayerStep } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/relayer/useApproveRelayerStep'
import { useRelayerMode } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/relayer/useRelayerMode'
import { useTokenApprovalSteps } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/approvals/useTokenApprovalSteps'
import { useContractAddress } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/contracts/useContractAddress'
import { useMemo } from 'react'
import { usePool } from '../../PoolProvider'
import { LiquidityActionHelpers } from '../LiquidityActionHelpers'
import { AddLiquidityStepParams, useAddLiquidityStep } from './useAddLiquidityStep'
import { useSignRelayerStep } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/useSignRelayerStep'
import { Address } from 'viem'
import { isCowAmmPool } from '../../pool.helpers'

type AddLiquidityStepsParams = AddLiquidityStepParams & {
  helpers: LiquidityActionHelpers
}
export function useAddLiquiditySteps({
  helpers,
  handler,
  humanAmountsIn,
  simulationQuery,
}: AddLiquidityStepsParams) {
  const vaultAddress = useContractAddress('balancer.vaultV2')
  const { pool, chainId, chain } = usePool()
  const relayerMode = useRelayerMode(pool)
  const shouldSignRelayerApproval = useShouldSignRelayerApproval(chainId, relayerMode)
  const { step: approveRelayerStep, isLoading: isLoadingRelayerApproval } =
    useApproveRelayerStep(chainId)
  const signRelayerStep = useSignRelayerStep(chain)

  const inputAmounts = useMemo(
    () => helpers.toInputAmounts(humanAmountsIn),
    [humanAmountsIn, helpers]
  )

  const { isLoading: isLoadingTokenApprovalSteps, steps: tokenApprovalSteps } =
    useTokenApprovalSteps({
      spenderAddress: isCowAmmPool(pool.type) ? (pool.address as Address) : vaultAddress,
      chain: pool.chain,
      approvalAmounts: inputAmounts,
      actionType: 'AddLiquidity',
    })

  const addLiquidityStep = useAddLiquidityStep({
    handler,
    humanAmountsIn,
    simulationQuery,
  })

  const steps = useMemo(() => {
    if (relayerMode === 'approveRelayer') {
      return [approveRelayerStep, ...tokenApprovalSteps, addLiquidityStep]
    } else if (shouldSignRelayerApproval) {
      return [signRelayerStep, ...tokenApprovalSteps, addLiquidityStep]
    }

    return [...tokenApprovalSteps, addLiquidityStep]
  }, [
    relayerMode,
    shouldSignRelayerApproval,
    tokenApprovalSteps,
    addLiquidityStep,
    approveRelayerStep,
    signRelayerStep,
    humanAmountsIn,
  ])

  return {
    isLoadingSteps: isLoadingTokenApprovalSteps || isLoadingRelayerApproval,
    steps,
  }
}
