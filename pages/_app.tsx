import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from 'reducers'
import Head from 'next/head'
import '../src/assets/scss'

const store = createStore(reducers, applyMiddleware(ReduxThunk))

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>Dashboard Kopi Florist</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
