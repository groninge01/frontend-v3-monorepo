/* eslint-disable max-len */
import { testHook } from '@frontend-monorepo/balancer-frontend-v3/test/utils/custom-renderers'
import { useBuildUnstakeCallData } from './useBuildUnstakeCallData'
import { GaugeService } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/staking/gauge.service'
import { BatchRelayerService } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/batch-relayer/batch-relayer.service'
import mainnetNetworkConfig from '@frontend-monorepo/balancer-frontend-v3/lib/config/networks/mainnet'
import { gaugeActionsService } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/batch-relayer/extensions/gauge-actions.service'
import { defaultTestUserAccount } from '@frontend-monorepo/balancer-frontend-v3/test/anvil/anvil-setup'
import { Address } from 'viem'
import { aGqlPoolElementMock } from '@frontend-monorepo/balancer-frontend-v3/test/msw/builders/gqlPoolElement.builders'

function testBuildUnstakeCallData(amount: bigint, userAddress: Address = defaultTestUserAccount) {
  const batchRelayerService = new BatchRelayerService(
    mainnetNetworkConfig.contracts.balancer.relayerV6,
    gaugeActionsService
  )
  const gaugeService = new GaugeService(batchRelayerService)
  const gauges = [aGqlPoolElementMock().staking?.id || ''] as Address[]
  const { result } = testHook(() =>
    useBuildUnstakeCallData({
      amount,
      gaugeService,
      gauges,
      hasUnclaimedBalRewards: false,
      hasUnclaimedNonBalRewards: false,
      userAddress,
    })
  )
  return result
}
describe('useBuildUnstakeCallData', () => {
  test('when no amount', () => {
    const result = testBuildUnstakeCallData(0n)
    expect(result.current).toEqual([])
  })

  test('when no connected user', () => {
    const notConnectedUserAddress = '' as Address
    const result = testBuildUnstakeCallData(10n, notConnectedUserAddress)
    expect(result.current).toEqual([])
  })

  test('generates a valid unstake call data', () => {
    const result = testBuildUnstakeCallData(10n)

    expect(result.current).toEqual([
      '0x65ca48040000000000000000000000002d42910d826e5500579d121596e98a6eb33c0a1b000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000000000a',
    ])
  })
})
