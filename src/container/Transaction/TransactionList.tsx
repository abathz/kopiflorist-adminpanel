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

interface StateComponent {
  isPaymentNull: boolean,
  action: string,
  message: string
}

class TransactionList extends Component<PropsComponent, StateComponent> {
  constructor (props: PropsComponent) {
    super(props)
  }

  componentDidMount () {
    this.props.getAllInvoices()
  }

  transactionStatus (invoice: any) {
    const paymentStatus = invoice.payment_status
    const paymentDetails = invoice.payment_details
    switch (paymentStatus) {
      case 0:
        if (paymentDetails !== null) {
          if (paymentDetails.need_action) {
            return {
              isPaymentNull: true,
              action: 'midtrans_success',
              message: 'Waiting to Payment'
            }
          } else {
            return {
              isPaymentNull: false,
              action: '',
              message: 'Payment Pending'
            }
          }
        } else {
          return {
            isPaymentNull: true,
            action: 'midtrans_failed',
            message: 'Waiting to Payment'
          }
        }
      case 1:
        return {
          isPaymentNull: false,
          action: '',
          message: 'Payment Success'
        }
      case -1:
        return {
          isPaymentNull: false,
          action: '',
          message: 'Payment Cancelled/Exprired'
        }
      default:
        return {
          isPaymentNull: false,
          action: '',
          message: ''
        }
    }
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
          <td style={{ paddingTop: '20px' }}>{data.pickup !== null ? data.pickup.pickup_method.pickup_method_name : 'Ambil ditempat'}</td>
          <td style={{ paddingTop: '20px' }}>{data.total_price}</td>
          <td>
            <Link route='detailstransaction' params={{ id: data.id }}><Button color='info'>Details</Button></Link>
          </td>
          <td><Button>{this.transactionStatus(data).message}</Button></td>
        </tr>
      )
    })
  }

  render () {
    return (
      <>
        <h1>Transaction</h1>
        <div className='mb-5' style={{ borderBottom: '2px solid #333' }}/>
        <Table responsive={true} className='text-center table-custom' hover={true} bordered={true}>
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
