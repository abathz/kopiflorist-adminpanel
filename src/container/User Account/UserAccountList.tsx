import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'

interface StateProps { }

interface DispatchProps { }

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class UserAccountList extends Component<PropsComponent, StateComponent> {
  render () {
    return (
      <>
        <h1>Product List</h1>
        <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        <Table responsive={true} className='text-center table-custom' hover={true} bordered={true}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='pt-3'>1</td>
              <td className='pt-3'>Nicky Oenrob</td>
              <td className='pt-3'>nickyrasta@yahoo.com</td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
}

export default UserAccountList
