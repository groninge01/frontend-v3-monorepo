import { alternativeTestUserAccount } from '@frontend-monorepo/balancer-frontend-v3/test/anvil/anvil-setup'
import { testHook } from '@frontend-monorepo/balancer-frontend-v3/test/utils/custom-renderers'
import { waitFor } from '@testing-library/react'
import {
  connectWithAlternativeUser,
  disconnectAlternativeUser,
} from '../../../test/utils/wagmi/wagmi-connections'
import { useUserAccount } from './UserAccountProvider'

function testUseUserAccount() {
  const { result } = testHook(() => useUserAccount())
  return result
}

test('connects with alternative test user account', async () => {
  await connectWithAlternativeUser()
  const result = testUseUserAccount()
  await waitFor(() => expect(result.current.userAddress).toBe(alternativeTestUserAccount))
  await disconnectAlternativeUser()
})
