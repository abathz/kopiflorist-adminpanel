import React, { Component } from 'react'
import LoginAdmin from 'container/Auth/LoginAdmin'

export default class extends Component<{}, {}> {
  componentDidMount () {
    if (localStorage.getItem('session')) {
      window.location.href = '/dashboard'
    }
  }

  render () {
    return <LoginAdmin />
  }
}
