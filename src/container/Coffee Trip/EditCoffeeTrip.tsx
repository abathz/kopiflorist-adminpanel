import React, { ChangeEvent, Component, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDataTable, updateDataTrip, getTrip, editTrip, changeAvailabilityTrip } from 'actions/index'

interface StateProps {
  id: number
  trip: any
}

interface DispatchProps {
  updateDataTrip: typeof updateDataTrip
  getTrip: typeof getTrip
  addDataTable: typeof addDataTable
  editTrip: typeof editTrip
  changeAvailabilityTrip: typeof changeAvailabilityTrip
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent {
  data: any
}

class EditCoffeeTrip extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onAddClick = this.onAddClick.bind(this)
    this.onClickButtonAvailability = this.onClickButtonAvailability.bind(this)
  }

  componentDidMount () {
    this.props.getTrip(this.props.id)
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'main_photo_edited') {
      this.props.updateDataTrip({ prop: e.target.id, value: e.target.files })
      return
    }
    if (e.target.id === 'other_photo_edited') {
      this.props.updateDataTrip({ prop: e.target.id, value: e.target.files })
      return
    }
    this.props.updateDataTrip({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.editTrip(this.props.id, this.props.trip)
  }

  onAddClick () {
    const data = {
      time: this.props.trip.time_itinerary,
      activity: this.props.trip.activity_itinerary,
      description: this.props.trip.description_itinerary
    }
    this.props.addDataTable(data)
  }

  onClickButtonAvailability () {
    this.props.changeAvailabilityTrip(this.props.id)
  }

  renderDataTable () {
    const { dataTable } = this.props.trip
    if (!dataTable) return ''
    return dataTable.map((_data: any, index: number) => {
      return (
        <tr key={index}>
          <td>{_data.time}</td>
          <td>{_data.activity}</td>
          <td>{_data.description}</td>
          <td><FontAwesomeIcon icon={faPen} /></td>
        </tr>
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
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label className='label' for='provide'>What we’ll provide</Label>
                <Input type='text' id='provide' value={trip.provide} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='itinerary'>Itinerary</Label>
                <Table className='text-center table-custom' id='itinerary' bordered={true}>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Activity</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderDataTable()}
                  </tbody>
                </Table>
                <Row>
                  <Col xs='2'>
                    <FormGroup>
                      <Label className='label' for='time_itinerary'>Time</Label>
                      <Input type='text' id='time_itinerary' onChange={this.onInputChange} />
                    </FormGroup>
                  </Col>
                  <Col xs='3'>
                    <FormGroup>
                      <Label className='label' for='activity_itinerary'>Activity</Label>
                      <Input type='text' id='activity_itinerary' onChange={this.onInputChange} />
                    </FormGroup>
                  </Col>
                  <Col xs='7'>
                    <FormGroup>
                      <Label className='label' for='description_itinerary'>Description</Label>
                      <Input type='text' id='description_itinerary' onChange={this.onInputChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs='12'>
                    <Button className='float-right' color='primary' onClick={this.onAddClick}>Add</Button>
                  </Col>
                </Row>
                <div className='clearfix' />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='price'>Price/Guest</Label>
                <Input type='text' id='price' value={trip.price} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
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
            <Button className='px-5' color='primary' onClick={this.onClickButtonAvailability}>{trip.availability ? 'Inactive' : 'Active'}</Button>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ trip }: any) => {
  return { trip }
}

export default connect(mapStateToProps, {
  updateDataTrip,
  addDataTable,
  getTrip,
  editTrip,
  changeAvailabilityTrip
})(EditCoffeeTrip)
