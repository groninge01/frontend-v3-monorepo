import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { GetProtocolStatsDocument } from '@frontend-monorepo/api'
import { supportedNetworks } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/ChainConfig'

export function useProtocolStats() {
  const statQuery = useQuery(GetProtocolStatsDocument, {
    variables: {
      chains: supportedNetworks,
    },
  })

  return {
    statQuery,
  }
}
