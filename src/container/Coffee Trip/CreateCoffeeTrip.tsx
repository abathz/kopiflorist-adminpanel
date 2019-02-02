import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDataTable, createTrip, updateDataTrip, getAllTripPackage } from 'actions'
import React, { ChangeEvent, Component, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import _ from 'lodash'

interface StateProps {
  trip: any
  allTripPackage: any
}

interface DispatchProps {
  updateDataTrip: typeof updateDataTrip
  createTrip: typeof createTrip
  addDataTable: typeof addDataTable
  getAllTripPackage: typeof getAllTripPackage
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent {
  duration_day: string
  trip_package: any[]
  price_trip_package: number[]
  arrTrip: any[]
  packageChecked: number
  isPackageChecked: boolean[]
}

class CreateCoffeeTrip extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.state = {
      duration_day: '',
      trip_package: [],
      price_trip_package: [],
      arrTrip: [],
      packageChecked: 0,
      isPackageChecked: []
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onAddItineraryClick = this.onAddItineraryClick.bind(this)
  }

  componentDidMount () {
    this.props.getAllTripPackage()
  }

  componentDidUpdate () {
    const { allTripPackage } = this.props
    if (this.state.isPackageChecked.length === 0) {
      this.setState({ isPackageChecked: Array(allTripPackage.length).fill(false) })
    }
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
        let arr = Array(Number(this.state.duration_day))

        for (let i = 0; i < arr.length; i ++) {
          arr[i] = Array()
        }
        this.props.updateDataTrip({ prop: 'dataTable', value: arr })
      })
    }
    if (e.target.id === 'price_trip_package') {
      this.state.price_trip_package.push(Number(e.target.value))
      this.props.updateDataTrip({ prop: 'price_trip_package', value: [...this.state.price_trip_package] })
      return
    }
    this.props.updateDataTrip({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.createTrip(this.props.trip)
  }

  onAddItineraryClick () {
    const data = {
      day: Number(this.props.trip.day),
      time: this.props.trip.time_itinerary,
      activity: this.props.trip.activity_itinerary
    }
    this.props.addDataTable(data)
  }

  onTripPackageClicked = (selected: any) => (e: any) => {
    const index = this.state.trip_package.indexOf(selected)
    if (index < 0) {
      this.state.trip_package.push(selected)
      this.state.isPackageChecked[selected - 1] = true
    } else {
      this.state.trip_package.splice(index, 1)
      this.state.price_trip_package.splice(index, 1)
      this.state.isPackageChecked[selected - 1] = false
      this.props.updateDataTrip({ prop: 'price_trip_package', value: { isCreated: true, data: [...this.state.price_trip_package] } })
    }
    this.props.updateDataTrip({ prop: 'trip_package', value: { isCreated: true, data: [...this.state.trip_package] } })
  }

  renderTripPackageList () {
    const { allTripPackage } = this.props
    if (!allTripPackage) return <div/>
    return _.map(allTripPackage, (data: any, index: number) => {
      return (
        <div key={index}>
          <FormGroup check={true}>
            <Label check={true}>
              <Input type='checkbox' onClick={this.onTripPackageClicked(data.id)} /> {data.package_name}
            </Label>
          </FormGroup>
          {
            this.state.isPackageChecked[index]
            ? <FormGroup>
                <Input type='text' id='price_trip_package' onBlur={this.onInputChange}/>
              </FormGroup>
            : <div/>
          }
        </div>
      )
    })
  }

  renderDataTable () {
    const { dataTable } = this.props.trip
    return _.map(dataTable, (data: any, index: number) => {
      if (_.isEmpty(data)) return <tr key={index}/>
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

  render () {
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
                <Label className='label' for='day'>Itinerary</Label>
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
                    <Button className='float-right' color='primary' onClick={this.onAddItineraryClick}>Add</Button>
                  </Col>
                </Row>
                <div className='clearfix' />
              </FormGroup>
              <Label className='label'>Trip Package</Label>
              {this.renderTripPackageList()}
              <FormGroup className='mt-2'>
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

const mapStateToProps = ({ trip, trippackage }: any) => {
  const { allTripPackage } = trippackage
  return { trip, allTripPackage }
}

export default connect(mapStateToProps, {
  updateDataTrip,
  createTrip,
  addDataTable,
  getAllTripPackage
})(CreateCoffeeTrip)
