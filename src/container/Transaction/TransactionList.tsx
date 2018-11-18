import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'

interface StateProps { }

interface DispatchProps { }

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class TransactionList extends Component<PropsComponent, StateComponent> {
  render () {
    return (
      <>
        <h1>Transaction</h1>
        <div className='mb-5' style={{ borderBottom: '2px solid #333' }}/>
        <Table className='text-center table-custom' hover={true} bordered={true}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Transaction Code</th>
              <th style={{ paddingBottom: '12px' }}>User</th>
              <th style={{ paddingBottom: '12px' }}>Order Date & Time</th>
              <th>Coffee Trip & Product</th>
              <th style={{ paddingBottom: '12px' }}>Quantity/Guest</th>
              <th>Total Price</th>
              <th style={{ paddingBottom: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>P123456</td>
              <td>Nicky Oenrob</td>
              <td>15 August 2018 (12.21)</td>
              <td>Dewi Rengganis</td>
              <td>3</td>
              <td>375.000</td>
              <td>
                <Button>Success</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>P123456</td>
              <td>Nicky Oenrob</td>
              <td>15 August 2018 (12.21)</td>
              <td>Dewi Rengganis</td>
              <td>3</td>
              <td>375.000</td>
              <td>
                <Button>Success</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>P123456</td>
              <td>Nicky Oenrob</td>
              <td>15 August 2018 (12.21)</td>
              <td>Dewi Rengganis</td>
              <td>3</td>
              <td>375.000</td>
              <td>
                <Button>Success</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
}

export default TransactionList
