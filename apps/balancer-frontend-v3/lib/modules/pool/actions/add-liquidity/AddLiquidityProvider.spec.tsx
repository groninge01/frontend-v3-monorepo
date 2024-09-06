import {
  balAddress,
  daiAddress,
  usdcAddress,
  usdtAddress,
  wETHAddress,
} from '@frontend-monorepo/balancer-frontend-v3/lib/debug-helpers'
import { GqlPoolElement } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { aBalWethPoolElementMock } from '@frontend-monorepo/balancer-frontend-v3/test/msw/builders/gqlPoolElement.builders'
import {
  DefaultAddLiquidityTestProvider,
  buildDefaultPoolTestProvider,
  testHook,
} from '@frontend-monorepo/balancer-frontend-v3/test/utils/custom-renderers'
import { PropsWithChildren } from 'react'
import { _useAddLiquidity } from './AddLiquidityProvider'
import { nestedPoolMock } from '../../__mocks__/nestedPoolMock'

async function testUseAddLiquidity(pool: GqlPoolElement = aBalWethPoolElementMock()) {
  const PoolProvider = buildDefaultPoolTestProvider(pool)

  const Providers = ({ children }: PropsWithChildren) => (
    <PoolProvider>
      <DefaultAddLiquidityTestProvider>{children}</DefaultAddLiquidityTestProvider>
    </PoolProvider>
  )
  const { result } = testHook(() => _useAddLiquidity(), {
    wrapper: Providers,
  })
  return result
}

test('returns amountsIn with empty input amount by default', async () => {
  const result = await testUseAddLiquidity()

  expect(result.current.humanAmountsIn).toEqual([
    {
      tokenAddress: balAddress,
      humanAmount: '',
    },
    {
      tokenAddress: wETHAddress,
      humanAmount: '',
    },
  ])
})

// Only works when using .only
// there's a global state collision otherwise (investigation pending)
test.skip('returns valid tokens for a nested pool', async () => {
  const result = await testUseAddLiquidity(nestedPoolMock as GqlPoolElement)

  expect(result.current.validTokens.map(t => t.address)).toEqual([
    wETHAddress,
    daiAddress,
    usdtAddress,
    usdcAddress,
  ])
})
