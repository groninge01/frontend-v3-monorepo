import {
  GetPoolsDocument,
  GetTokensDocument,
} from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { getQueryName } from './utils'

describe('getQueryName', () => {
  test('works for TypedDocumentNode', () => {
    expect(getQueryName(GetTokensDocument)).toBe('GetTokens')
  })

  test('works for DocumentNode', () => {
    expect(getQueryName(GetPoolsDocument)).toBe('GetPools')
  })
})
