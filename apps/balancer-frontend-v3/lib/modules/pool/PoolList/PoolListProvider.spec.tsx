import { PoolList as PoolListType } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.types'
import {
  defaultPoolListMock,
  mockPoolList,
} from '@frontend-monorepo/balancer-frontend-v3/test/msw/handlers/PoolList.handlers'
import { aGqlPoolMinimalMock } from '@frontend-monorepo/balancer-frontend-v3/test/msw/builders/gqlPoolMinimal.builders'
import { testHook } from '@frontend-monorepo/balancer-frontend-v3/test/utils/custom-renderers'
import { _usePoolList } from './PoolListProvider'

async function renderUsePoolsList() {
  const { result, waitForLoadedUseQuery } = testHook(() => _usePoolList())
  await waitForLoadedUseQuery(result)
  return result
}

test('Returns pool list', async () => {
  const result = await renderUsePoolsList()

  expect(result.current.pools).toEqual(defaultPoolListMock)
})

test('Returns pool list with a custom mocked GQL pool', async () => {
  const mockedList: PoolListType = [aGqlPoolMinimalMock({ name: 'FOO BAL' })]

  mockPoolList(mockedList)

  const result = await renderUsePoolsList()

  expect(result.current.pools[0].name).toEqual('FOO BAL')
})
