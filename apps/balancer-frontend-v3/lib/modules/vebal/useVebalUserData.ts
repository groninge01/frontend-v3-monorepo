import {
  GetVeBalUserDocument,
  GqlChain,
} from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { useUserAccount } from '../web3/UserAccountProvider'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'

export function useVebalUserData() {
  const { userAddress, isConnected } = useUserAccount()

  const { data, refetch } = useQuery(GetVeBalUserDocument, {
    variables: {
      address: userAddress.toLowerCase(),
      chain: GqlChain.Mainnet,
    },
  })

  return {
    data,
    refetch,
    isConnected,
  }
}
