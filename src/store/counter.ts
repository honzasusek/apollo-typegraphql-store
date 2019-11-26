import { Field, ObjectType, Mutation, Resolver, Ctx } from 'type-graphql'

import { ApolloCache } from 'apollo-cache'
import gql from 'graphql-tag'

interface ApolloContext {
  cache: ApolloCache<any>
}

@ObjectType()
class Counter {
  @Field()
  public value: number = 0
}

@Resolver(() => Counter)
class CounterResolver {
  @Mutation(returns => Boolean, { nullable: true })
  incrementCounter(@Ctx() context: ApolloContext) {
    this.updateCounter(context.cache, value => value + 1)
  }

  @Mutation(returns => Boolean, { nullable: true })
  decrementCounter(@Ctx() context: ApolloContext) {
    this.updateCounter(context.cache, value => Math.max(value - 1, 0))
  }

  private updateCounter(
    cache: ApolloCache<any>,
    getNewValueCb: (value: number) => number
  ) {
    const query = gql`
      query {
        counter @client {
          __typename
          value
        }
      }
    `
    const { counter } = cache.readQuery<{ counter: Counter }>({ query })!
    const data = {
      counter: {
        ...counter,
        value: getNewValueCb(counter.value),
      },
    }
    cache.writeQuery({ query, data })
  }
}

export { Counter }

export default CounterResolver
