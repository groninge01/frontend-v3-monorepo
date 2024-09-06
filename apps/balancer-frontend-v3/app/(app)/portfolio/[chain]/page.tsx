'use client'
import { PoolName } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/PoolName'
import { Pool } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/PoolProvider'
import { ClaimModal } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/claim/ClaimModal'
import { ClaimProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/actions/claim/ClaimProvider'
import {
  ChainSlug,
  slugToChainMap,
} from '@frontend-monorepo/balancer-frontend-v3/lib/modules/pool/pool.utils'
// eslint-disable-next-line max-len
import { ClaimNetworkPoolsLayout } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/portfolio/PortfolioClaim/ClaimNetworkPools/ClaimNetworkPoolsLayout'
import { usePortfolio } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/portfolio/PortfolioProvider'
import { TokenIconStack } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokenIconStack'
import { TransactionStateProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/transaction-steps/TransactionStateProvider'
import { NetworkIcon } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/icons/NetworkIcon'
import { useCurrency } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/hooks/useCurrency'
import { Button, Card, HStack, Heading, Skeleton, Stack, Text, VStack } from '@chakra-ui/react'
import { capitalize } from 'lodash'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function NetworkClaim() {
  const { toCurrency } = useCurrency()
  const { chain } = useParams()
  const {
    poolsByChainMap,
    poolRewardsMap,
    totalFiatClaimableBalanceByChain,
    isLoadingRewards,
    refetchClaimPoolData,
  } = usePortfolio()

  const gqlChain = slugToChainMap[chain as ChainSlug]
  const pools = poolsByChainMap[gqlChain]
  const chainName = capitalize(chain as string)
  const claimableFiatBalance = totalFiatClaimableBalanceByChain[gqlChain]

  const isClaimAllDisabled = pools?.every(pool =>
    poolRewardsMap[pool.id]?.totalFiatClaimBalance?.isEqualTo(0)
  )

  const [modalPools, setModalPools] = useState<Pool[]>([])

  const hasMultipleClaims = pools ? pools.length > 1 : false

  return (
    <TransactionStateProvider>
      <ClaimNetworkPoolsLayout backLink={'/portfolio'} title="Portfolio">
        <HStack pb="1" justifyContent="space-between">
          <HStack spacing="xs">
            <NetworkIcon chain={gqlChain} size={12} />
            <Stack spacing="none">
              <Heading size="md">{chainName} incentives</Heading>
            </Stack>
          </HStack>
          <Heading size="md" variant="special">
            {claimableFiatBalance && toCurrency(claimableFiatBalance)}
          </Heading>
        </HStack>
        <Stack py="4" gap="md">
          {isLoadingRewards ? (
            <Skeleton height="126px" />
          ) : pools && pools.length > 0 ? (
            pools?.map(
              pool =>
                poolRewardsMap[pool.id]?.totalFiatClaimBalance?.isGreaterThan(0) && (
                  <Card key={pool.id} variant="subSection">
                    <VStack align="start">
                      <HStack w="full">
                        <PoolName pool={pool} fontWeight="bold" fontSize="lg" />
                        <Text fontWeight="bold" variant="special" ml="auto">
                          {toCurrency(
                            poolRewardsMap[pool.id]?.totalFiatClaimBalance?.toNumber() || 0
                          )}
                        </Text>
                      </HStack>
                      <HStack w="full">
                        <TokenIconStack tokens={pool.displayTokens} chain={pool.chain} size={36} />
                        {hasMultipleClaims && (
                          <Button
                            onClick={() => {
                              setModalPools([pool])
                            }}
                            variant="secondary"
                            size="sm"
                            ml="auto"
                            minW="60px"
                          >
                            Claim
                          </Button>
                        )}
                      </HStack>
                    </VStack>
                  </Card>
                )
            )
          ) : (
            <Text p="10" variant="secondary" textAlign="center">
              You have no liquidity incentives to claim
            </Text>
          )}
        </Stack>
        {pools && pools.length > 0 && (
          <Button
            onClick={() => {
              setModalPools(pools)
            }}
            width="100%"
            variant="secondary"
            size="lg"
            isDisabled={isClaimAllDisabled}
          >
            {`Claim${hasMultipleClaims ? ' all' : ''}`}
          </Button>
        )}
        {modalPools.length > 0 && (
          <ClaimProvider pools={modalPools}>
            <ClaimModal
              isOpen={modalPools.length > 0}
              onClose={(isSuccess: boolean) => {
                if (isSuccess) {
                  refetchClaimPoolData()
                }

                setModalPools([])
              }}
              chain={gqlChain}
            />
          </ClaimProvider>
        )}
      </ClaimNetworkPoolsLayout>
    </TransactionStateProvider>
  )
}
