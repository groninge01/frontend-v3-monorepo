import { PortfolioProvider } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/portfolio/PortfolioProvider'
import { DefaultPageContainer } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/containers/DefaultPageContainer'

type Props = {
  children: React.ReactNode
}

export default async function PortfolioLayout({ children }: Props) {
  return (
    <DefaultPageContainer minH="100vh">
      <PortfolioProvider>{children}</PortfolioProvider>
    </DefaultPageContainer>
  )
}
