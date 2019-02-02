import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getInvoice } from 'actions'
import _ from 'lodash'
import { Col, Row, Button } from 'reactstrap'
import { Link } from 'routes'
import moment from 'moment'

interface StateProps {
  id: number
  invoice: any
}

interface DispatchProps {
  getInvoice: typeof getInvoice
}

interface PropsComponent extends StateProps, DispatchProps {}

interface StateComponent {}

class DetailsTransaction extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getInvoice(this.props.id)
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

  render () {
    const { invoice } = this.props
    return (
      <>
        <h1>{invoice.invoice_code}</h1>
        <div className='mb-4' style={{ borderBottom: '2px solid #333' }} />
        <Link route='/dashboard'><Button color='danger' className='mb-4'>Back</Button></Link>
        <Row>
          {this.renderDataTrips()}
          {this.renderDataProducts()}
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ transaction }: any) => {
  const { invoice } = transaction

  return { invoice }
}

export default connect(mapStateToProps, { getInvoice })(DetailsTransaction)
