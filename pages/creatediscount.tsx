import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Sidebar from 'container/Sidebar'
import CreateDiscount from 'container/Discount/CreateDiscount'

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
    if (!this.state.session) return ''
    return (
      <>
        <Sidebar />
        <div className='content'>
          <Container>
            <CreateDiscount/>
          </Container>
        </div>
      </>
    )
  }
}
