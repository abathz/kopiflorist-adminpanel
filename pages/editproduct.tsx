import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Sidebar from 'container/Sidebar'
import EditProduct from 'container/Product/EditProduct'

export default class extends Component<{ query: any }, { session: any }> {
  constructor (props: any) {
    super(props)

    this.state = { session: '' }
  }

  static async getInitialProps ({ query }: any) {
    return { query }
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
            <EditProduct id={this.props.query.id}/>
          </Container>
        </div>
      </>
    )
  }
}
