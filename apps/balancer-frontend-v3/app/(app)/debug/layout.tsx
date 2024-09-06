import { DefaultPageContainer } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/containers/DefaultPageContainer'
import { PropsWithChildren } from 'react'

export default function DebugLayout({ children }: PropsWithChildren) {
  return <DefaultPageContainer>{children}</DefaultPageContainer>
}
