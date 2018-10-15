import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Sidebar from 'container/Sidebar'
import DiscountList from 'container/Discount/DiscountList'

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
            <DiscountList/>
          </Container>
        </div>
      </>
    )
  }
}
