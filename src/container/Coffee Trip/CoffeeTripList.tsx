import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Row, Col } from 'reactstrap'
import { Link } from 'routes'
import { getAllTrip, deleteTrip } from 'actions/index'

interface StateProps {
  allTrip: any
}

interface DispatchProps {
  getAllTrip: typeof getAllTrip
  deleteTrip: typeof deleteTrip
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CoffeTripList extends Component<PropsComponent, StateComponent> {

  componentDidMount () {
    this.props.getAllTrip()
  }

  onDeleteClick (id: number) {
    this.props.deleteTrip(id)
  }

  renderDataTable () {
    const { allTrip } = this.props
    if (!allTrip) return ''
    return allTrip.map((_data: any) => {
      const date = _data.trip_date.substring(0, 10).split('-')
      const tripDate = `${date[2]}-${date[1]}-${date[0]}`
      return (
        <tr key={_data.id}>
          <td className='pt-3'>{_data.id}</td>
          <td className='pt-3'>{_data.title}</td>
          <td className='pt-3'>{tripDate} ({_data.duration === 1 ? 'Day Trip' : '3D2N'})</td>
          <td className='pt-3'>{_data.address}</td>
          <td className='pt-3'>{_data.price}</td>
          <td className='pt-3'>{_data.availability ? 'Active' : 'Inactive'}</td>
          <td>
            <Link route='editcoffeetrip' params={{ id: _data.id }}><Button className='mr-1' color='primary' size='sm'>Edit</Button></Link>
            <Button color='danger' size='sm' onMouseDown={this.onDeleteClick.bind(this, _data.id)}>Delete</Button>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <Row>
        <Col xs='12'>
          <h1>Coffee Trip List</h1>
          <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        </Col>
        <Col xs='12' className='text-right mb-3'>
          <Link route='createtrippackage'><Button className='mr-3' color='primary'>Add Trip Package</Button></Link>
          <Link route='createcoffeetrip'><Button color='primary'>Add</Button></Link>
        </Col>
        <Col xs='12'>
          <Table className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Trip Name</th>
                <th>Time</th>
                <th>Location</th>
                <th>Price/Guest</th>
                <th>Status</th>
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

const mapStateToProps = ({ trip }: any) => {
  const { allTrip } = trip

  return { allTrip }
}

export default connect(mapStateToProps, { getAllTrip, deleteTrip })(CoffeTripList)
