import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap'
import { updateDataPackage, getAllTripPackage, createTripPackage, deleteTripPackage } from 'actions'
import _ from 'lodash'

interface StateProps {
  trippackage: any
  allTripPackage: any
}

interface DispatchProps {
  updateDataPackage: typeof updateDataPackage
  getAllTripPackage: typeof getAllTripPackage
  createTripPackage: typeof createTripPackage
  deleteTripPackage: typeof deleteTripPackage
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CreateTripPackageType extends Component<PropsComponent, StateComponent> {

  componentDidMount () {
    this.props.getAllTripPackage()
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateDataPackage({ prop: e.target.id, value: e.target.value })
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { trippackage } = this.props
    let data = {
      package_name: trippackage.package_name,
      min_participant: trippackage.min_participant,
      max_participant: trippackage.max_participant
    }

    this.props.createTripPackage(data)
  }

  deleteTripPackage = (id: number) => () => {
    this.props.deleteTripPackage(id)
  }

  renderDataTable () {
    const { allTripPackage } = this.props
    if (!allTripPackage) return <tr/>
    return _.map(allTripPackage, (data: any, index: number) => {
      return (
        <tr key={index}>
          <td className='pt-3'>{data.package_name}</td>
          <td className='pt-3'>{data.min_participant}</td>
          <td className='pt-3'>{data.max_participant}</td>
          <td><Button color='danger' onMouseDown={this.deleteTripPackage(data.id)}>Delete</Button></td>
        </tr>
      )
    })
  }

  render () {
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Category</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row>
          <Col xs='6'>
            <Form className='mb-5' onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='package_name'>Package Name</Label>
                <Input type='text' id='package_name' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='min_participant'>Min Participant</Label>
                <Input type='number' id='min_participant' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='max_participant'>Max Participant</Label>
                <Input type='number' id='max_participant' onChange={this.onInputChange} />
              </FormGroup>
              <Button block={true} color='primary'>Add</Button>
            </Form>
            <Table responsive={true} className='text-center table-custom' hover={true} bordered={true}>
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Min Participant</th>
                  <th>Max Participant</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderDataTable()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ trippackage }: any) => {
  const { allTripPackage } = trippackage
  return { trippackage, allTripPackage }
}

export default connect(mapStateToProps, { updateDataPackage, getAllTripPackage, createTripPackage, deleteTripPackage })(CreateTripPackageType)
