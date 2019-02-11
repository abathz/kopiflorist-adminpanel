import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Form, Label, FormGroup, Input } from 'reactstrap'
import {
  updateDataDiscount,
  getAllProduct,
  getAllTrip,
  productChecked,
  productUnchecked,
  tripChecked,
  tripUnchecked,
  createDiscount,
  resetStateDiscount
} from 'actions'

interface StateProps {
  discount: any
  allProduct: []
  allTrip: []
}

interface DispatchProps {
  updateDataDiscount: typeof updateDataDiscount
  getAllProduct: typeof getAllProduct
  getAllTrip: typeof getAllTrip
  productChecked: typeof productChecked
  productUnchecked: typeof productUnchecked
  tripChecked: typeof tripChecked
  tripUnchecked: typeof tripUnchecked
  createDiscount: typeof createDiscount
  resetStateDiscount: typeof resetStateDiscount
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CreateDiscount extends Component<PropsComponent, StateComponent> {

  componentWillUnmount () {
    this.props.resetStateDiscount()
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'appliedfor') {
      if (e.target.value === '1') {
        this.props.getAllProduct()
      } else {
        this.props.getAllTrip()
      }
    }
    if (e.target.id === 'product_checked') {
      if (!e.target.checked) {
        this.props.productUnchecked(e.target.value)
        return
      }
      this.props.productChecked(e.target.value)
      return
    }
    if (e.target.id === 'trip_checked') {
      if (!e.target.checked) {
        this.props.tripUnchecked(e.target.value)
        return
      }
      this.props.tripChecked(e.target.value)
      return
    }
    this.props.updateDataDiscount({ prop: e.target.id, value: e.target.value })
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.createDiscount(this.props.discount)
  }

  renderDataProductForDiscount () {
    const { allProduct } = this.props
    if (!allProduct) return ''
    return allProduct.map((_data: any) => {
      return (
        <Col xs='3' key={_data.id}>
          <img className='img-fluid' src={_data.photo} />
          <div className='checked'>
            <FormGroup check={true}>
              <Label check={true}>
                <Input id='product_checked' value={_data.id} type='checkbox' style={{ width: '25px', height: '25px', left: '103px', top: '0px' }} onChange={this.onInputChange} />
              </Label>
            </FormGroup>
          </div>
        </Col>
      )
    })
  }

  renderDataTripForDiscount () {
    const { allTrip } = this.props
    if (!allTrip) return ''
    return allTrip.map((_data: any) => {
      return (
        <Col xs='3' key={_data.id}>
          <img className='img-fluid' style={{ height: '100%' }} src={_data.main_photo}/>
          <div className='checked'>
            <FormGroup check={true}>
              <Label check={true}>
                <Input id='trip_checked' value={_data.id} type='checkbox' style={{ width: '25px', height: '25px', left: '103px', top: '0px' }} onChange={this.onInputChange} />
              </Label>
            </FormGroup>
          </div>
        </Col>
      )
    })
  }

  render () {
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Discount</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='discount_name'>Discount Name</Label>
                <Input type='text' id='discount_name' onChange={this.onInputChange}/>
              </FormGroup>
              <FormGroup>
                <Label className='label' for='description'>Description</Label>
                <Input type='textarea' id='description' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='amount'>Amount (%)</Label>
                <Input type='text' id='amount' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='start_date'>Start</Label>
                <Input type='date' id='start_date' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='end_date'>End</Label>
                <Input type='date' id='end_date' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for='appliedfor'>Applied For</Label>
                <Input type='select' id='appliedfor' onChange={this.onInputChange}>
                  <option defaultChecked={true}>Select</option>
                  <option value={1}>Product</option>
                  <option value={2}>Trip</option>
                </Input>
              </FormGroup>
              <Row className='mb-5'>
                {this.props.discount.appliedfor !== 0 ? this.props.discount.appliedfor === '1' ? this.renderDataProductForDiscount() : this.renderDataTripForDiscount() : ''}
              </Row>
              <Button block={true} color='primary'>Save</Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ discount, product, trip }: any) => {
  const { allProduct } = product
  const { allTrip } = trip
  return { discount, allProduct, allTrip }
}

export default connect(mapStateToProps, {
  updateDataDiscount,
  getAllProduct,
  getAllTrip,
  productChecked,
  productUnchecked,
  tripChecked,
  tripUnchecked,
  createDiscount,
  resetStateDiscount
})(CreateDiscount)
