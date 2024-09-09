import { GetPoolsDocument } from '@frontend-monorepo/api'
import { getQueryName, mockGQL } from '../utils'
import { graphql } from 'msw'
import { aGqlPoolMinimalMock } from '../builders/gqlPoolMinimal.builders'
import { PoolList } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.types'
import { GQLResponse } from './msw-helpers'

export const defaultPoolListItemMock = aGqlPoolMinimalMock()
export const defaultPoolListMock: PoolList = [defaultPoolListItemMock]

export function buildPoolListMswHandler(poolList = defaultPoolListMock) {
  return graphql.query(getQueryName(GetPoolsDocument), () => {
    return GQLResponse({ pools: poolList })
  })
}

export function mockPoolList(poolList = defaultPoolListMock) {
  mockGQL(buildPoolListMswHandler(poolList))
}
