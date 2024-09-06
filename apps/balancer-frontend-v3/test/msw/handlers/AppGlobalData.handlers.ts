import { GetAppGlobalPollingDataDocument } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { getQueryName, mockGQL } from '../utils'
import { graphql } from 'msw'
import { anAppGlobalData } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/__mocks__/AppGlobalData.builders'
import { GQLResponse } from './msw-helpers'

export const defaultAppGlobalDataMock = anAppGlobalData()

export function buildAppGlobalDataMswHandler(appGlobalData = defaultAppGlobalDataMock) {
  return graphql.query(getQueryName(GetAppGlobalPollingDataDocument), () => {
    return GQLResponse(appGlobalData)
  })
}

export function mockAppGlobalData(appGlobalData = defaultAppGlobalDataMock) {
  mockGQL(buildAppGlobalDataMswHandler(appGlobalData))
}
