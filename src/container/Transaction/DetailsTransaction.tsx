import React, { Component, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { getInvoice, updateShipping, updateDataInvoice, trackDelivery } from 'actions'
import _ from 'lodash'
import { Col, Row, Button, FormGroup, Label, Input, Table } from 'reactstrap'
import { Link } from 'routes'
import moment from 'moment'

interface StateProps {
  id: number
  invoice: any
  transaction: any
  trackingDelivery: any
}

interface DispatchProps {
  getInvoice: typeof getInvoice
  updateShipping: typeof updateShipping
  updateDataInvoice: typeof updateDataInvoice
  trackDelivery: typeof trackDelivery
}

interface PropsComponent extends StateProps, DispatchProps {}

interface StateComponent {}

class DetailsTransaction extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getInvoice(this.props.id)
    this.props.trackDelivery(this.props.id)
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateDataInvoice({ prop: e.target.id, value: e.target.value })
  }

  onSaveClicked = () => {
    const { transaction } = this.props
    let data = {
      idInvoice: transaction.invoice.id,
      awb: transaction.awb
    }

    this.props.updateShipping(data)
  }

  transactionStatus () {
    const { invoice } = this.props
    const paymentStatus = invoice.payment_status
    const paymentDetails = invoice.payment_details
    switch (paymentStatus) {
      case 0:
        if (paymentDetails !== null) {
          if (paymentDetails.need_action) {
            return {
              isPaymentNull: true,
              action: 'midtrans_success',
              message: 'Continue to Payment'
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
            message: 'Continue to Payment'
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

  serializeAddress () {
    const { invoice } = this.props
    if (!invoice.pickup.address) return ''
    const address = invoice.pickup.address
    return `${address.address}, ${address.city}, ${address.province}, ${address.postal_code}`
  }

  serializePayment () {
    const { invoice } = this.props
    if (!invoice.payment_details) return ''
    switch (invoice.payment_details.payment_type) {
      case 'bank_transfer':
      case 'echannel':
        return (
          <Col xs='6'>
            <h5>Payment</h5>
            <p>Payment Method: {invoice.payment_details.payment_type}</p>
            <p>Bank: {invoice.payment_details.billing}</p>
            <p>Account Number: {invoice.payment_details.billing_number}</p>
          </Col>
        )
      case 'cstore':
        return (
          <Col xs='6'>
            <h5>Payment</h5>
            <p>Payment Method: {invoice.payment_details.payment_type}</p>
            <p>Store: {invoice.payment_details.billing}</p>
            <p>Payment Code: {invoice.payment_details.billing_number}</p>
          </Col>
        )
      default:
        if (invoice.payment_details.payment_type !== '') {
          return (
            <Col xs='6'>
              <h5>Payment</h5>
              <p>Payment Method: {invoice.payment_details.payment_type}</p>
            </Col>
          )
        } else {
          return ''
        }
    }
  }

  serializePickupMethod () {
    const { invoice } = this.props
    if (invoice.pickup === null) return <div/>
    return (
      <Col xs='6'>
        <h5>Pickup Method</h5>
        <p>Pickup Method: {invoice.pickup.pickup_method.pickup_method_name}</p>
        {invoice.pickup.pickup_method.code === 'jne' ?
          <>
            <p>Destination Address: {this.serializeAddress()}</p>
            <p>Service Pickup: {invoice.pickup.pickup_method_service}</p>
            {
              invoice.pickup.awb !== ''
                ? <p>No. Resi JNE: {invoice.pickup.awb}</p>
                : <>
                  <FormGroup>
                    <Label for='awb'>No. Resi JNE</Label>
                    <Input type='text' id='awb' onChange={this.onInputChange} />
                  </FormGroup>
                  <Button color='success' block={true} onMouseDown={this.onSaveClicked}>Save</Button>
                </>
            }
          </>
        : <div/>
        }
      </Col>
    )
  }

  renderDataTrips () {
    const { invoice } = this.props
    if (!invoice.cart) return ''
    return _.map(invoice.cart.trips, (data: any, index: number) => {
      let tripDate = data.trip_days.trip_date.substring(0,10)
      let startDate = moment(tripDate).format('DD MMMM YYYY')
      let endDate = moment(tripDate).add(data.trip_days.duration_in_days - 1, 'd').format('DD MMMM YYYY')
      return (
        <Col xs='12' key={index}>
          <div className={`review-item`}>
            <Col xs='12'>
              <Row>
                <Col xs='1'>
                  <img className='img-fluid' src={data.photo} alt={data.title} />
                </Col>
                <Col xs='9'>
                  <div className='d-flex flex-column'>
                    <span className='text-l text-black text-hel-95'>{data.title}</span>
                    <span className='text-m text-black'>{data.address}</span>
                    <span className='text-s text-black'>{startDate} - {endDate}</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </Col>
      )
    })
  }

  renderDataProducts () {
    const { invoice } = this.props
    if (!invoice.cart) return ''
    return _.map(invoice.cart.products, (data: any, index: number) => {
      return (
        <Col xs='12' key={index}>
          <div className={`review-item`}>
            <Col xs='12'>
              <Row>
                <Col xs='1'>
                  <img className='img-fluid' src={data.photo} alt={data.title} />
                </Col>
                <Col xs='9'>
                  <div className='d-flex flex-column'>
                    <span className='text-l text-black text-hel-95'>{data.name}</span>
                    <span className='text-m text-black'>{data.category}</span>
                    <span className='text-ml text-black'>Rp {data.price}</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </Col>
      )
    })
  }

  trackHistory () {
    const { trackingDelivery } = this.props
    return _.map(trackingDelivery.manifest, (data: any, index: number) => {
      let serializeDate = `${moment(data.manifest_date).format('DD-MM-YYYY')} ${data.manifest_time}`
      return (
        <tr key={index}>
          <td>{serializeDate}</td>
          <td>{data.manifest_description} [{data.city_name}]</td>
        </tr>
      )
    })
  }

  renderDataTrackingDelivery () {
    const { trackingDelivery } = this.props
    if (!trackingDelivery.summary) return ''
    return (
      <>
        <Table responsive={true} bordered={true}>
          <thead>
            <tr>
              <th>No. AWB</th>
              <th>Service</th>
              <th>Date of Shipment</th>
              <th>Origin</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{trackingDelivery.summary.waybill_number}</td>
              <td>{trackingDelivery.summary.service_code}</td>
              <td>{moment(trackingDelivery.summary.waybill_date).format('DD MMMM YYYY')}</td>
              <td>{trackingDelivery.summary.origin}</td>
              <td>{trackingDelivery.summary.destination}</td>
            </tr>
          </tbody>
        </Table>
        <Table responsive={true} bordered={true}>
          <thead>
            <tr>
              <th>Shipper</th>
              <th>Consignee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{trackingDelivery.details.shippper_name}</td>
              <td>{trackingDelivery.details.receiver_name}</td>
            </tr>
            <tr>
              <td>{trackingDelivery.details.shipper_address1}</td>
              <td>{trackingDelivery.details.receiver_address1}</td>
            </tr>
          </tbody>
        </Table>
        <Table responsive={true} bordered={true}>
          <thead>
            <tr>
              <th colSpan={2}>History</th>
            </tr>
          </thead>
          <tbody>
            {this.trackHistory()}
          </tbody>
        </Table>
      </>
    )
  }

  render () {
    const { invoice } = this.props
    if (!invoice.user) return ''
    return (
      <>
        <h1>{invoice.invoice_code}</h1>
        <div className='mb-4' style={{ borderBottom: '2px solid #333' }} />
        <Link route='/dashboard'><Button color='danger' className='mb-4'>Back</Button></Link>
        <Row className='mb-4'>
          <Col xs='6'>
            <h5>User</h5>
            <p>Name: {invoice.user.name}</p>
            <p>Email: {invoice.user.email}</p>
            <p>Phone: {invoice.user.phone}</p>
          </Col>
          <Col xs='6'>
            <h5>Transaction</h5>
            <p>Invoice Code: {invoice.invoice_code}</p>
            <p>Status: {this.transactionStatus().message}</p>
            <p>Date Order: {moment(invoice.createdAt).format('DD MMMM YYYY (HH:SS)')}</p>
            <p>Total Price: {invoice.total_price}</p>
          </Col>
        </Row>
        <Row className='mb-4'>
          {this.serializePickupMethod()}
          {this.serializePayment()}
        </Row>
        {
          invoice.pickup.pickup_method.code === 'jne'
            ? <>
              <h4>Tracking Delivery</h4>
              {this.renderDataTrackingDelivery()}
            </>
            : <div />
        }
        <div className='mb-4' style={{ borderBottom: '2px solid #333' }} />
        <Row>
          {this.renderDataTrips()}
          {this.renderDataProducts()}
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ transaction }: any) => {
  const { invoice, trackingDelivery } = transaction

  return { invoice, trackingDelivery, transaction }
}

export default connect(mapStateToProps, {
  getInvoice,
  updateShipping,
  updateDataInvoice,
  trackDelivery
})(DetailsTransaction)
