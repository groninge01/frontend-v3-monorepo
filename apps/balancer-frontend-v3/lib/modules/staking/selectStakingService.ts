import { GaugeService } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/staking/gauge.service'
import { BatchRelayerService } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/batch-relayer/batch-relayer.service'
import { getNetworkConfig } from '@frontend-monorepo/balancer-frontend-v3/lib/config/app.config'
import { gaugeActionsService } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/batch-relayer/extensions/gauge-actions.service'
import { GqlChain, GqlPoolStakingType } from '@frontend-monorepo/api'

export function selectStakingService(chain: GqlChain, stakingType: GqlPoolStakingType) {
  const networkConfig = getNetworkConfig(chain)
  const batchRelayerService = new BatchRelayerService(
    networkConfig.contracts.balancer.relayerV6,
    gaugeActionsService
  )

  if (stakingType === 'GAUGE') {
    return new GaugeService(batchRelayerService)
  }
}
