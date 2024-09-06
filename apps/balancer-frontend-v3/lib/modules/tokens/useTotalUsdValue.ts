import { useTokens } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/tokens/TokensProvider'
import { isSameAddress } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/utils/addresses'
import { safeSum } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/utils/numbers'
import { useCallback } from 'react'
import { GqlToken } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/generated/graphql'
import { HumanTokenAmountWithAddress } from './token.types'

export function useTotalUsdValue(tokens: GqlToken[]) {
  const { usdValueForToken } = useTokens()
  const calculateUsdAmountsIn = useCallback(
    (humanAmountsIn: HumanTokenAmountWithAddress[]) =>
      humanAmountsIn.map(amountIn => {
        const token = tokens.find(token => isSameAddress(token?.address, amountIn.tokenAddress))

        if (!token) return '0'

        return usdValueForToken(token, amountIn.humanAmount)
      }),
    [usdValueForToken, tokens]
  )

  function usdValueFor(humanAmountsIn: HumanTokenAmountWithAddress[]) {
    return safeSum(calculateUsdAmountsIn(humanAmountsIn))
  }

  return { usdValueFor }
}
