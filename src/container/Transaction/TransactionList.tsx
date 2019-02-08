import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'reactstrap'
import { getAllInvoices } from 'actions'
import _ from 'lodash'
import moment from 'moment'
import { Link } from 'routes'

interface StateProps {
  allInvoices: any[]
}

interface DispatchProps {
  getAllInvoices: typeof getAllInvoices
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class TransactionList extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getAllInvoices()
  }

  renderDataTable () {
    const { allInvoices } = this.props
    return _.map(allInvoices, (data: any, index: number) => {
      let createdAt = moment(data.createdAt).format('DD MMMM YYYY (HH:SS)')
      return (
        <tr key={index}>
          <td style={{ paddingTop: '20px' }}>{data.id}</td>
          <td style={{ paddingTop: '20px' }}>{data.invoice_code}</td>
          <td style={{ paddingTop: '20px' }}>{data.user.name}</td>
          <td style={{ paddingTop: '20px' }}>{createdAt}</td>
          {
            data.pickup !== null
            ? <td style={{ paddingTop: '20px' }}>{data.pickup.pickup_method.pickup_method_name}</td>
            : <td style={{ paddingTop: '20px' }}>Ambil ditempat</td>
          }
          <td style={{ paddingTop: '20px' }}>{data.total_price}</td>
          <td>
            <Link route='detailstransaction' params={{ id: data.id }}><Button color='info'>Details</Button></Link>
          </td>
          <td>
            <Button>Success</Button>
          </td>
        </tr>
      )
    })
  }

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
              <th>User</th>
              <th>Order Date & Time</th>
              <th>Pickup Method</th>
              <th>Total Price</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderDataTable()}
          </tbody>
        </Table>
      </>
    )
  }
}

const mapStateToProps = ({ transaction }: any) => {
  const { allInvoices } = transaction

  return { allInvoices }
}

export default connect(mapStateToProps, { getAllInvoices })(TransactionList)
