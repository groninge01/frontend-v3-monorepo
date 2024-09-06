'use client'

// eslint-disable-next-line max-len
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr'
import { createApolloClient } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/api/apollo.client'

export function ApolloClientProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={createApolloClient}>{children}</ApolloNextAppProvider>
}
