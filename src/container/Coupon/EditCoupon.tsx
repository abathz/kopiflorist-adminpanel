import React, { Component, FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Form, Label, FormGroup, Input, Table } from 'reactstrap'
import { updateDataCoupon, getCoupon, editCoupon } from 'actions/index'

interface StateProps {
  id: any
  coupon: any
}

interface DispatchProps {
  updateDataCoupon: typeof updateDataCoupon
  getCoupon: typeof getCoupon
  editCoupon: typeof editCoupon
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class EditCoupon extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getCoupon(this.props.id)
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    this.props.updateDataCoupon({ prop: e.target.id , value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.editCoupon(this.props.coupon, this.props.id)
  }

  render () {
    const { coupon } = this.props
    console.log(coupon)
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Coupon</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='coupon_code'>Coupon Code</Label>
                <Input type='text' id='coupon_code' value={coupon.coupon_code} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='discount_amount'>Amount (%)</Label>
                <Input type='textarea' id='discount_amount' value={coupon.discount_amount} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='date_from'>Start</Label>
                <Input type='date' id='date_from' value={coupon.date_from} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='date_to'>End</Label>
                <Input type='date' id='date_to' value={coupon.date_to} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='max_discount'>Maximum Discount</Label>
                <Input type='textarea' id='max_discount' value={coupon.max_discount} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='min_price_discount'>Minimum Price Discount</Label>
                <Input type='text' id='min_price_discount' value={coupon.min_price_discount} onChange={this.onInputChange} />
              </FormGroup>
              <Button block={true} color='primary'>Save</Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ coupon }: any) => {
  return { coupon }
}

export default connect(mapStateToProps, { updateDataCoupon, getCoupon, editCoupon })(EditCoupon)
