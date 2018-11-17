import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDataTable, createTrip, updateDataTrip } from 'actions/index'
import React, { ChangeEvent, Component, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import _ from 'lodash'

interface StateProps {
  trip: any
}

interface DispatchProps {
  updateDataTrip: typeof updateDataTrip
  createTrip: typeof createTrip
  addDataTable: typeof addDataTable
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent {
  duration_day: string
}

class CreateCoffeeTrip extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.state = { duration_day: '' }

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onAddClick = this.onAddClick.bind(this)
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'main_photo') {
      this.props.updateDataTrip({ prop: e.target.id, value: e.target.files })
      return
    }
    if (e.target.id === 'other_photo') {
      this.props.updateDataTrip({ prop: e.target.id, value: e.target.files })
      return
    }
    if (e.target.id === 'duration') {
      this.setState({
        duration_day: e.target.value
      }, () => {
        this.props.updateDataTrip({ prop: 'dataTable', value: Array(Number(this.state.duration_day)) })
      })
    }
    this.props.updateDataTrip({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.createTrip(this.props.trip)
  }

  onAddClick () {
    const data = {
      day: this.props.trip.day,
      time: this.props.trip.time_itinerary,
      activity: this.props.trip.activity_itinerary,
      description: this.props.trip.description_itinerary
    }
    this.props.addDataTable(data)
  }

  renderDataTable () {
    const { dataTable } = this.props.trip
    return _.map(dataTable, (_data: any, index: number) => {
      if (_.isEmpty(_data)) return <tr key={index}/>
      if (_data.day === this.props.trip.day) {
        return (
          <tr key={index}>
            <td>{_data.time}</td>
            <td>{_data.activity}</td>
            <td>{_data.description}</td>
            <td><FontAwesomeIcon icon={faPen} /></td>
          </tr>
        )
      }
    })
  }

  render () {
    console.log(this.props.trip)
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Coffee Trip</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='trip_name'>Trip Name</Label>
                <Input type='text' id='trip_name' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='description'>Description</Label>
                <Input type='textarea' id='description' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='location'>Location</Label>
                <Input type='text' id='location' onChange={this.onInputChange} />
              </FormGroup>
              <Row>
                <Col xs='8'>
                  <FormGroup>
                    <Label className='label' for='trip_date'>Trip Date</Label>
                    <Input type='date' id='trip_date' onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
                <Col xs='4'>
                  <FormGroup>
                    <Label className='label' for='duration'>Duration</Label>
                    <Input type='select' id='duration' onChange={this.onInputChange}>
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
                <Input type='text' id='provide' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='itinerary'>Itinerary</Label>
                <Input type='select' id='day' className='mb-2' onChange={this.onInputChange}>
                  <option defaultChecked={true}>Select</option>
                  {_.map(Array(Number(this.state.duration_day)), (data: any, index: any) => {
                    const value = index + 1
                    return <option key={value} value={value}>{value}</option>
                  })}
                </Input>
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
                    <Button className='float-right' color='primary' onMouseDown={this.onAddClick}>Add</Button>
                  </Col>
                </Row>
                <div className='clearfix' />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='price'>Price/Guest</Label>
                <Input type='text' id='price' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='main_photo'>Main Photo</Label>
                <Input type='file' id='main_photo' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='other_photo'>Other Photo</Label>
                <Input type='file' id='other_photo' multiple={true} onChange={this.onInputChange} />
              </FormGroup>
              <Button block={true} color='primary'>Save</Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ trip }: any) => {
  return { trip }
}

export default connect(mapStateToProps, { updateDataTrip, createTrip, addDataTable })(CreateCoffeeTrip)
