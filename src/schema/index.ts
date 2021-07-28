import { makeSchema, declarativeWrappingPlugin } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'

// import customInputSchema from './inputs';
// import customResponseSchema from './outputs';
import models from './models';
import resolvers from '../resolvers';
import env from '../envVariables';

console.log(env);
export const schema = makeSchema({
  types: [
    ...resolvers,
    ...models,
    // ...customInputSchema,
    // ...customResponseSchema,
  ],
  plugins: [declarativeWrappingPlugin(), nexusPrisma({
    experimentalCRUD: true,
    shouldGenerateArtifacts: env.ENV === 'development',
    paginationStrategy: 'prisma',
    outputs: {
      typegen: path.join(process.cwd(), 'src/generated/prisma-nexus.ts'),
    },
  })],
  shouldGenerateArtifacts: true,
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'src/generated/nexus.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  contextType: {
    module: path.join(process.cwd(), 'src/context.ts'),
    export: 'Context',
    alias: 'ctx',
  },
});

export default { schema };
