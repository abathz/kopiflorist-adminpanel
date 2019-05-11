import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Table } from 'reactstrap'
import { Link } from 'routes'
import { getAllPickupMethod, deletePickupMethod } from 'actions'
import _ from 'lodash'

interface StateProps {
  allPickupMethod: any
}

interface DispatchProps {
  getAllPickupMethod: typeof getAllPickupMethod
  deletePickupMethod: typeof deletePickupMethod
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class PickupMethodList extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getAllPickupMethod()
  }

  onDeleteClick = (id: Number) => () => {
    this.props.deletePickupMethod(id)
  }

  renderDataTable () {
    const { allPickupMethod } = this.props
    if (!allPickupMethod) return <td/>
    return _.map(allPickupMethod, (data: any, index: number) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.pickup_method_name} (Code: {data.code})</td>
          <td>{data.is_rajaongkir_supported ? 'Yes' : 'No'}</td>
          <td>{data.self_pickup ? 'Yes' : 'No'}</td>
          <td><Button color='danger' size='sm' onMouseDown={this.onDeleteClick(data.id)}>Delete</Button></td>
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
          <Table responsive={true} className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>No</th>
                <th>Pickup Method Name</th>
                <th>Rajaongkir?</th>
                <th>Pickup By Customer?</th>
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

const mapStateToProps = ({ pickupmethod }: any) => {
  const { allPickupMethod } = pickupmethod

  return { allPickupMethod }
}

export default connect(mapStateToProps, { getAllPickupMethod, deletePickupMethod })(PickupMethodList)
