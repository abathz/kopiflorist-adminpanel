import React, { ChangeEvent, Component, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import _ from 'lodash'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  addDataTable,
  updateDataTrip,
  getTrip,
  editTrip,
  changeAvailabilityTrip,
  getAllTripPackage
} from 'actions'

interface StateProps {
  id: number
  trip: any
  allTripPackage: any
}

interface DispatchProps {
  updateDataTrip: typeof updateDataTrip
  getTrip: typeof getTrip
  addDataTable: typeof addDataTable
  editTrip: typeof editTrip
  changeAvailabilityTrip: typeof changeAvailabilityTrip
  getAllTripPackage: typeof getAllTripPackage
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent {
  trip_package: any[]
  price_trip_package: number[]
  isPackageChecked: boolean[]
}

class EditCoffeeTrip extends Component<PropsComponent, StateComponent> {
  constructor (props: PropsComponent) {
    super(props)

    this.state = {
      trip_package: [],
      price_trip_package: [],
      isPackageChecked: []
    }
  }

  componentDidMount () {
    this.props.getTrip(this.props.id)
    this.props.getAllTripPackage()
  }

  componentDidUpdate () {
    const { trip } = this.props
    if (this.state.trip_package !== trip.trip_package) {
      this.setState({ trip_package: trip.trip_package })
    }
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let isPriceTripPackage = e.target.id.split('-')[0] === 'price_trip_package'
    let indexPriceTripPackage = e.target.id.split('-')[1]
    if (e.target.id === 'main_photo_edited') {
      this.props.updateDataTrip({ prop: e.target.id, value: e.target.files })
      return
    }
    if (e.target.id === 'other_photo_edited') {
      this.props.updateDataTrip({ prop: e.target.id, value: e.target.files })
      return
    }
    if (isPriceTripPackage) {
      this.props.updateDataTrip({
        prop: 'trip_package',
        value: {
          index: indexPriceTripPackage, price: e.target.value
        }
      })
      return
    }
    this.props.updateDataTrip({ prop: e.target.id, value: e.target.value })
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.editTrip(this.props.id, this.props.trip)
  }

  onAddItineraryClicked = () => {
    const data = {
      day: Number(this.props.trip.day),
      time: this.props.trip.time_itinerary,
      activity: this.props.trip.activity_itinerary
    }
    this.props.addDataTable(data)
  }

  onMouseDownButtonAvailability = () => {
    this.props.changeAvailabilityTrip(this.props.id)
  }

  renderDataTable () {
    const { dataTable } = this.props.trip
    return _.map(dataTable, (data: any, index: number) => {
      if (_.isEmpty(data)) return <tr key={index} />
      return _.map(data, (data: any, index: number) => {
        if (data.day === Number(this.props.trip.day)) {
          return (
            <tr key={index}>
              <td>{data.time}</td>
              <td>{data.activity}</td>
              <td><FontAwesomeIcon icon={faPen} /></td>
            </tr>
          )
        }
      })
    })
  }

  renderTripPackageList () {
    const { trip } = this.props
    if (!trip) return <div />
    return _.map(trip.trip_package, (data: any, index: number) => {
      if (!this.state.trip_package[index]) return ''
      return (
        <div key={index}>
          <FormGroup check={true}>
            <Label check={true}>
              <Input type='checkbox' checked={this.state.trip_package[index].id === data.id} /> {data.package_name}
            </Label>
          </FormGroup>
          {
            this.state.trip_package[index].id === data.id
            ? <FormGroup>
                <Input type='text' id={`price_trip_package-${index}`} value={data.price} onChange={this.onInputChange} />
              </FormGroup>
            : <div/>
          }
        </div>
      )
    })
  }

  renderPhotoList () {
    const { other_photo } = this.props.trip
    if (!other_photo) return ''
    return other_photo.map((_data: any) => {
      return (
        <Col key={_data} xs='4'>
          <img className='img-fluid' src={_data} alt=''/>
        </Col>
      )
    })
  }

  render () {
    const { trip } = this.props
    if (!trip) return ''
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Edit Coffee Trip</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='trip_name'>Trip Name</Label>
                <Input type='text' id='trip_name' value={trip.trip_name} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='description'>Description</Label>
                <Input type='textarea' id='description' value={trip.description} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='location'>Location</Label>
                <Input type='text' id='location' value={trip.location} onChange={this.onInputChange} />
              </FormGroup>
              <Row>
                <Col xs='8'>
                  <FormGroup>
                    <Label className='label' for='trip_date'>Trip Date</Label>
                    <Input type='date' id='trip_date' value={trip.trip_date} onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
                <Col xs='4'>
                  <FormGroup>
                    <Label className='label' for='duration'>Duration</Label>
                    <Input type='select' id='duration' value={trip.duration} onChange={this.onInputChange}>
                      <option defaultChecked={true}>Select</option>
                      <option value='1'>1</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label className='label' for='provide'>What we’ll provide</Label>
                <Input type='text' id='provide' value={trip.provide} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='day'>Itinerary</Label>
                <Input type='select' id='day' className='mb-2' onChange={this.onInputChange}>
                  <option>Select</option>
                  {_.map(Array(trip.duration), (data: any, index: any) => {
                    const value = index + 1
                    return <option key={value} value={value}>{value}</option>
                  })}
                </Input>
                <Table responsive={true} className='text-center table-custom' id='itinerary' bordered={true}>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Activity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderDataTable()}
                  </tbody>
                </Table>
                <Row>
                  <Col xs='4'>
                    <FormGroup>
                      <Label className='label' for='time_itinerary'>Time</Label>
                      <Input type='text' id='time_itinerary' onChange={this.onInputChange} />
                    </FormGroup>
                  </Col>
                  <Col xs='8'>
                    <FormGroup>
                      <Label className='label' for='activity_itinerary'>Activity</Label>
                      <Input type='text' id='activity_itinerary' onChange={this.onInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs='12'>
                    <Button className='float-right' color='primary' onClick={this.onAddItineraryClicked}>Add</Button>
                  </Col>
                </Row>
                <div className='clearfix' />
              </FormGroup>
              {this.renderTripPackageList()}
              <FormGroup>
                <Label className='label' for='discount'>Discount</Label>
                <Input type='text' id='discount' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup className='mt-2'>
                <Label className='label' for='main_photo_edited'>Main Photo</Label>
                <Input type='file' id='main_photo_edited' onChange={this.onInputChange} />
              </FormGroup>
              <img className='img-fluid' src={trip.main_photo} />
              <div className='mt-3 mb-3' style={{ borderBottom: '2px solid #333' }} />
              <FormGroup>
                <Label className='label' for='other_photo_edited'>Other Photo</Label>
                <Input type='file' id='other_photo_edited' multiple={true} onChange={this.onInputChange} />
              </FormGroup>
              <Row className='mt-3 mb-5'>
                {this.renderPhotoList()}
              </Row>
              <Button block={true} color='primary'>Save</Button>
            </Form>
          </Col>
          <Col>
            <p className='label'>Availibility ({trip.availability ? 'Active' : 'Inactive'})</p>
            <Button className='px-5' color='primary' onMouseDown={this.onMouseDownButtonAvailability}>{trip.availability ? 'Inactive' : 'Active'}</Button>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ trip, trippackage }: any) => {
  const { allTripPackage } = trippackage
  return { trip, allTripPackage }
}

export default connect(mapStateToProps, {
  updateDataTrip,
  addDataTable,
  getTrip,
  editTrip,
  changeAvailabilityTrip,
  getAllTripPackage
})(EditCoffeeTrip)
