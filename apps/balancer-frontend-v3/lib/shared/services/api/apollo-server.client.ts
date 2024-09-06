import { config } from '@frontend-monorepo/balancer-frontend-v3/lib/config/app.config'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient: getApolloServerClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: config.apiUrl }),
  })
})
