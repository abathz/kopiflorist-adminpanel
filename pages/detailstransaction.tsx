import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Sidebar from 'container/Sidebar'
import DetailsTransaction from 'container/Transaction/DetailsTransaction'

export default class extends Component<{ query: any }, {}> {
  static async getInitialProps ({ query }: any) {
    return { query }
  }

  render () {
    return (
      <>
        <Sidebar />
        <div className='content'>
          <Container>
            <DetailsTransaction id={this.props.query.id}/>
          </Container>
        </div>
      </>
    )
  }
}
