/**
 * The types in this file only exist for testing reasons (MSW handlers will use them to mock GQL responses)
 */

import { GetTokensQuery } from '@frontend-monorepo/api'

// Each Token in this list is a superset of TokenBase
export type MswTokenList = GetTokensQuery['tokens']
