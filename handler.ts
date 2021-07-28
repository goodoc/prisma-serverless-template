import { ApolloServer } from 'apollo-server-lambda';
import { schema } from './src/schema'
import { createContext } from './src/context'
import 'source-map-support/register';

const server = new ApolloServer({
  schema,
  context: createContext,
})

const options: any = {
  cors: {
    origin: '*',
    credentials: false,
  },
  playground: true,
}

export const graphql = server.createHandler(options)
