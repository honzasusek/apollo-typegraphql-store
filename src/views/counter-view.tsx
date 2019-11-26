import React, { FC } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Counter } from '../store/counter'

import IncrementButton from './increment-button'
import DecrementButton from './decrement-button'

const CounterView: FC = () => (
  <Query<{ counter: Counter }>
    query={gql`
      query {
        counter @client {
          value
        }
      }
    `}
  >
    {({ data, loading }) => (
      <>
        <h1>Counter:</h1>
        <h2>{loading ? 'Loading...' : data!.counter.value}</h2>
        <IncrementButton />
        <DecrementButton />
      </>
    )}
  </Query>
)

export default CounterView
