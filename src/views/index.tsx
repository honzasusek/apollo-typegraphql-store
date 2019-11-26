import React, { Component, useState, useEffect } from 'react'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import createClient from '../store/create-client'
import Loader from './loader'
import CounterView from './counter-view'

const App = () => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null)

  useEffect(() => {
    ;(async function initialize(): Promise<void> {
      const client = await createClient()
      setClient(client)
    })()
  }, [])

  if (!client) return <Loader />

  console.log(client)

  return (
    <ApolloProvider client={client}>
      <CounterView />
    </ApolloProvider>
  )
}

export default App
