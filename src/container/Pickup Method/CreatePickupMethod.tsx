import React, { Component, FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { updateDataPickupMethod, createPickupMethod } from 'actions'

interface StateProps {
  pickupmethod: any
}

interface DispatchProps {
  updateDataPickupMethod: typeof updateDataPickupMethod
  createPickupMethod: typeof createPickupMethod
}

interface PropsComponent extends StateProps, DispatchProps {}

interface StateComponent {}

class CreatePickupMethod extends Component<PropsComponent, StateComponent> {

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      this.props.updateDataPickupMethod({ prop: e.target.id, value: e.target.checked })
      return
    }
    this.props.updateDataPickupMethod({ prop: e.target.id, value: e.target.value })
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.createPickupMethod(this.props.pickupmethod)
  }

  render () {
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Pickup Method</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='pickup_method_name'>Pickup Method Name</Label>
                <Input type='text' id='pickup_method_name' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup check>
                <Label check={true}>
                  <Input type="checkbox" id='is_rajaongkir_supported' onChange={this.onInputChange} checked={this.props.pickupmethod.is_rajaongkir_supported} />{' '}
                  Listed In Rajaongkir? (Fee from Rajaongkir)
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check={true}>
                  <Input type="checkbox" id='self_pickup' onChange={this.onInputChange} checked={this.props.pickupmethod.self_pickup} />{' '}
                  Pickup By Customer (No Pickup Fee)
                </Label>
              </FormGroup>
              <br/>
              <Button block={true} color='primary'>Save</Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ pickupmethod }: any) => {
  return { pickupmethod }
}

export default connect(mapStateToProps, { updateDataPickupMethod, createPickupMethod })(CreatePickupMethod)
