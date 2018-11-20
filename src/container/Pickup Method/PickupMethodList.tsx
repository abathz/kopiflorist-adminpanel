import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Table } from 'reactstrap'
import { Link } from 'routes'
import { getAllPickupMethod } from 'actions/index'
import _ from 'lodash'

interface StateProps {
  allPickupMethod: any
}

interface DispatchProps {
  getAllPickupMethod: typeof getAllPickupMethod
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class PickupMethodList extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getAllPickupMethod()
  }

  renderDataTable () {
    const { allPickupMethod } = this.props
    console.log(allPickupMethod)
    if (!allPickupMethod) return <td/>
    return _.map(allPickupMethod, (data: any, index: number) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.pickup_method_name}</td>
        </tr>
      )
    })
  }

  render () {
    return (
      <Row>
        <Col xs='12'>
          <h1>Pickup Method List</h1>
          <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        </Col>
        <Col xs='12' className='text-right mb-3'>
          <Link route='createpickupmethod'><Button color='primary'>+ Add</Button></Link>
        </Col>
        <Col xs='12'>
          <Table className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>No</th>
                <th>Pickup Method Name</th>
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

const mapStateToProps = ({ pickupmethod }: any) => {
  const { allPickupMethod } = pickupmethod

  return { allPickupMethod }
}

export default connect(mapStateToProps, { getAllPickupMethod })(PickupMethodList)
