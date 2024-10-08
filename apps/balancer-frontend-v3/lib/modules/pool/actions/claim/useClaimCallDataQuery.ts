import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'
import { GaugeService } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/staking/gauge.service'

export function useClaimCallDataQuery(
  gaugeAddresses: Address[],
  gaugeService: GaugeService | undefined,
  hasUnclaimedNonBalRewards: boolean,
  hasUnclaimedBalRewards: boolean,
  enabled = true
) {
  const inputData = {
    hasUnclaimedNonBalRewards,
    hasUnclaimedBalRewards,
    gauges: gaugeAddresses,
    outputReference: 0n,
  }

  const queryKey = ['claim', 'gauge', 'callData', inputData]
  const queryFn = (): `0x${string}`[] => {
    if (!gaugeService) return []
    return gaugeService.getGaugeClaimRewardsContractCallData(inputData)
  }

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: enabled && gaugeService && gaugeAddresses.length > 0,
  })

  return {
    ...query,
    data: query.data || [],
  }
}
