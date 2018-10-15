import React, { Component } from 'react'
import LoginAdmin from 'container/Auth/LoginAdmin'

export default class extends Component<{ query: any }, { session: any }> {
  render () {
    return <LoginAdmin />
  }
}
