import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Row, Col } from 'reactstrap'
import { Link } from 'routes'
import { getAllDiscount } from 'actions'
import moment from 'moment'

interface StateProps {
  allDiscount: any
}

interface DispatchProps {
  getAllDiscount: typeof getAllDiscount
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class DiscountList extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getAllDiscount()
  }

  renderDataTable () {
    const { allDiscount } = this.props
    if (!allDiscount) return ''
    return allDiscount.map((_data: any) => {
      const dateFrom = _data.date_from.substring(0, 10)
      const dateTo = _data.date_to.substring(0, 10)
      const startDate = moment(dateFrom).format('DD M YYYY')
      const endDate = moment(dateTo).format('DD M YYYY')
      return (
        <tr key={_data.id}>
          <td className='pt-3'>{_data.id}</td>
          <td className='pt-3'>{_data.name}</td>
          <td className='pt-3'>{_data.description}</td>
          <td className='pt-3'>{_data.discount_amount}%</td>
          <td className='pt-3'>{startDate}</td>
          <td className='pt-3'>{endDate}</td>
          <td className='pt-3'>{_data.appliedfor === 1 ? 'Product' : 'Coffee Trip'}</td>
          <td>
            <a className='pr-1' href=''><Button color='primary' size='sm'>Edit</Button></a>
            <a href=''><Button color='danger' size='sm'>Delete</Button></a>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <Row>
        <Col xs='12'>
          <h1>Discount List</h1>
          <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        </Col>
        <Col xs='12' className='text-right mb-3'>
          <Link route='creatediscount'><Button color='primary'>+ Add</Button></Link>
        </Col>
        <Col xs='12'>
          <Table className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>No</th>
                <th>Discount Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Start</th>
                <th>End</th>
                <th>Applied For</th>
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

const mapStateToProps = ({ discount }: any) => {
  const { allDiscount } = discount

  return { allDiscount }
}

export default connect(mapStateToProps, { getAllDiscount })(DiscountList)
