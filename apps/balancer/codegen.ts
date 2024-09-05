import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    ['./src/lib/shared/services/api/generated/schema.graphql']: {
      schema: process.env.NEXT_PUBLIC_BALANCER_API_URL,
      plugins: ['schema-ast'],
    },
    [`./src/lib/shared/services/api/generated/`]: {
      schema: process.env.NEXT_PUBLIC_BALANCER_API_URL,
      documents: ['./src/lib/shared/services/api/**/*.graphql'],
      preset: 'client',
      config: {
        nonOptionalTypename: true,
        scalars: {
          BigInt: 'string',
          BigDecimal: 'string',
          Bytes: 'string',
          AmountHumanReadable: 'string',
          GqlBigNumber: 'string',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['pnpm run lint:fix'],
  },
}

export default config
