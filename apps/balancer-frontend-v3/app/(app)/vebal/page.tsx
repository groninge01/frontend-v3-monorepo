'use client'

import { VebalInfo } from '@frontend-monorepo/balancer-frontend-v3/lib/modules/vebal/VebalInfo'
import { Stack } from '@chakra-ui/react'

export default function VebalPage() {
  return (
    <Stack gap="lg">
      <VebalInfo />
    </Stack>
  )
}
