import { useNetworkConfig } from '@frontend-monorepo/balancer-frontend-v3/lib/config/useNetworkConfig'
import { balancerMinterAbi } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/contracts/abi/generated'
import { useUserAccount } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/UserAccountProvider'
import { useReadContract } from 'wagmi'

export function useHasMinterApproval() {
  const { isConnected, userAddress } = useUserAccount()

  const networkConfig = useNetworkConfig()
  const { chainId, contracts } = networkConfig

  const query = useReadContract({
    chainId,
    abi: balancerMinterAbi,
    address: contracts.balancer.minter,
    account: userAddress,
    functionName: 'getMinterApproval',
    args: [contracts.balancer.relayerV6, userAddress],
    query: { enabled: isConnected },
  })
  return {
    ...query,
    hasMinterApproval: query.data ?? false,
  }
}
