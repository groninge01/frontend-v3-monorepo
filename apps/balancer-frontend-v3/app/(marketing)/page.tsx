'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { Box } from '@chakra-ui/react'
import { AnimatedSVG } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/marketing/AnimatedSVG'
import { HomeHero } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/marketing/HomeHero'
import { HomeBuilders } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/marketing/HomeBuilders'
import { HomeProtocols } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/marketing/HomeProtocols'
import { HomeActivity } from '@frontend-monorepo/balancer-frontend-v3/lib/shared/components/marketing/HomeActivity'
import { FOO } from '@frontend-monorepo/frontend-helpers'

export default function Home() {
  console.log({ FOO })
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <Box className="homepage" overflowX="hidden">
        <HomeHero />
        <Box height={{ base: '100px', md: '200px' }} zIndex="-1" position="relative">
          <AnimatedSVG />
        </Box>
        <HomeBuilders />
        <HomeProtocols />
        <HomeActivity />
      </Box>
    </ReactLenis>
  )
}
