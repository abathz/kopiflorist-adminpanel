import React, { Component } from 'react'
import SignupAdmin from 'container/Auth/SignupAdmin'

export default class extends Component<{}, { session: any }> {
  constructor (props: any) {
    super(props)

    this.state = { session: '' }
  }

  componentDidMount () {
    const sessionAdmin = localStorage.getItem('session')
    this.setState({
      session: sessionAdmin
    })
  }

  render () {
    return <SignupAdmin/>
  }
}
