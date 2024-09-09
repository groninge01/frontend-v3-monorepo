import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    ['libs/shared/services/api/src/lib/generated/schema.graphql']: {
      schema: process.env.NEXT_PUBLIC_BALANCER_API_URL,
      plugins: ['schema-ast'],
    },
    [`libs/shared/services/api/src/lib/generated/`]: {
      schema: process.env.NEXT_PUBLIC_BALANCER_API_URL,
      documents: ['libs/shared/services/api/src/lib/*.graphql'],
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
}

export default config
