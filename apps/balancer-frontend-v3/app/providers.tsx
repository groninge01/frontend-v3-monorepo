import { Web3Provider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/Web3Provider'
import { ThemeProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/chakra/ThemeProvider'
import { ReactNode } from 'react'
import { RecentTransactionsProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/transactions/RecentTransactionsProvider'
import { UserSettingsProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/user/settings/UserSettingsProvider'
import { ThemeProvider as ColorThemeProvider } from 'next-themes'
import { DEFAULT_THEME_COLOR_MODE } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/services/chakra/themes/base/foundations'
import { wagmiConfig } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/web3/WagmiConfig'
import { GlobalAlertsProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/alerts/GlobalAlertsProvider'
import { ApolloClientProvider } from '../lib/config/apollo/apollo-client-provider'
import { ApolloGlobalDataProvider } from '../lib/config/apollo/apollo-global-data.provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ColorThemeProvider defaultTheme={DEFAULT_THEME_COLOR_MODE}>
      <ThemeProvider>
        <GlobalAlertsProvider>
          <Web3Provider wagmiConfig={wagmiConfig}>
            <ApolloClientProvider>
              <ApolloGlobalDataProvider>
                <UserSettingsProvider>
                  <RecentTransactionsProvider>{children}</RecentTransactionsProvider>
                </UserSettingsProvider>
              </ApolloGlobalDataProvider>
            </ApolloClientProvider>
          </Web3Provider>
        </GlobalAlertsProvider>
      </ThemeProvider>
    </ColorThemeProvider>
  )
}
