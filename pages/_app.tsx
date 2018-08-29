import * as React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from 'reducers'

const store = createStore(reducers, applyMiddleware(ReduxThunk))

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={store}>
          <div className='container'>
            <Component {...pageProps} />
          </div>
        </Provider>
      </Container>
    )
  }
}
