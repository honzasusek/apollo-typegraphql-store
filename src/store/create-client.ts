import 'reflect-metadata'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import CounterResolver, { Counter } from './counter'
import ApolloClient, { Resolvers, gql } from 'apollo-boost'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types'

const createClient = async (): Promise<any> => {
  const query = gql`
    query {
      counter @client {
        __typename
        value
      }
    }
  `

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [CounterResolver],
    skipCheck: true,
  })

  const cache = new InMemoryCache()

  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
  })

  const client = new ApolloClient({
    cache,
    clientState: {
      typeDefs,
      resolvers: resolvers as Resolvers,
    },
  })

  let data = undefined
  try {
    data = client.readQuery({ query })
  } catch (error) {
    console.log('No client data yet')
    console.log(error)
  }

  if (!data) {
    client.writeQuery({
      query,
      data: {
        counter: {
          __typename: Counter.name,
          value: 0,
        },
      },
    })
  }

  return client
}

export default createClient
