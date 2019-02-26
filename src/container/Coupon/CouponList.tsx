import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Row, Col } from 'reactstrap'
import { Link } from 'routes'
import { getAllCoupon, deleteCoupon } from 'actions'
import moment from 'moment'

interface StateProps {
  allCoupon: any
}

interface DispatchProps {
  getAllCoupon: typeof getAllCoupon
  deleteCoupon: typeof deleteCoupon
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CouponList extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getAllCoupon()
  }

  onDeleteClick = (id: any) => () => {
    this.props.deleteCoupon(id)
  }

  renderDataTable () {
    const { allCoupon } = this.props
    if (!allCoupon) return ''
    return allCoupon.map((_data: any) => {
      const dateFrom = _data.date_from.substring(0, 10)
      const dateTo = _data.date_to.substring(0, 10)
      const startDate = moment(dateFrom).format('DD-MM-YYYY')
      const endDate = moment(dateTo).format('DD-MM-YYYY')
      return (
        <tr key={_data.id}>
          <td className='pt-3'>{_data.id}</td>
          <td className='pt-3'>{_data.coupon_code}</td>
          <td className='pt-3'>{_data.discount_amount}%</td>
          <td className='pt-3'>{_data.max_discount}</td>
          <td className='pt-3'>{_data.min_price_discount}</td>
          <td className='pt-3'>{_data.quantity}</td>
          <td className='pt-3'>{startDate}</td>
          <td className='pt-3'>{endDate}</td>
          <td>
            <Link route='editcoupon' params={{ id: _data.id }}><Button className='mr-1' color='primary' size='sm'>Edit</Button></Link>
            <Button color='danger' size='sm' onMouseDown={this.onDeleteClick(_data.id)}>Delete</Button>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <Row>
        <Col xs='12'>
          <h1>Coupon List</h1>
          <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        </Col>
        <Col xs='12' className='text-right mb-3'>
          <Link route='createcoupon'><Button color='primary'>+ Add</Button></Link>
        </Col>
        <Col xs='12'>
          <Table responsive={true} className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>No</th>
                <th>Coupon Code</th>
                <th>Amount</th>
                <th>Max Discount</th>
                <th>Min Price Discount</th>
                <th>Limit Usage</th>
                <th>Start</th>
                <th>End</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDataTable()}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ coupon }: any) => {
  const { allCoupon } = coupon

  return { allCoupon }
}

export default connect(mapStateToProps, { getAllCoupon, deleteCoupon })(CouponList)
