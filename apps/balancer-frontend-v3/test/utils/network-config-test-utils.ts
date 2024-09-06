import networkConfig from '@frontend-monorepo/balancer-frontend-v3/lib/config/networks/mainnet'

export function getNetworkTestUtils() {
  return { getEthAddress: getETHAddress }

  function getETHAddress() {
    return networkConfig.tokens.nativeAsset.address
  }
}

export const networkTestUtils = getNetworkTestUtils()
