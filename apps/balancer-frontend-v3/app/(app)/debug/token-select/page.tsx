'use client'

import { TokenSelectModal } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokenSelectModal/TokenSelectModal'
import { TokenBalancesProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokenBalancesProvider'
import { useTokens } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokensProvider'
import { GqlChain, GqlToken } from '@frontend-monorepo/api'
import { Button, useDisclosure, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'

export default function TokenSelectPage() {
  const [selectedToken, setSelectedToken] = useState<GqlToken>()
  const tokenSelectBtn = useRef(null)
  const tokenSelectDisclosure = useDisclosure()
  const { getTokensByChain } = useTokens()

  function handleTokenSelect(token: GqlToken) {
    setSelectedToken(token)
  }

  return (
    <TokenBalancesProvider extTokens={getTokensByChain(1)}>
      <h1>TokenSelectPage</h1>
      <Text>Selected token: {selectedToken?.symbol}</Text>
      <Button ref={tokenSelectBtn} onClick={tokenSelectDisclosure.onOpen}>
        Open modal
      </Button>
      <TokenSelectModal
        tokens={getTokensByChain(1)}
        chain={GqlChain.Mainnet}
        pinNativeAsset
        finalFocusRef={tokenSelectBtn}
        isOpen={tokenSelectDisclosure.isOpen}
        onOpen={tokenSelectDisclosure.onOpen}
        onClose={tokenSelectDisclosure.onClose}
        onTokenSelect={handleTokenSelect}
      />
    </TokenBalancesProvider>
  )
}
