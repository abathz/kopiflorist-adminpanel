import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Form, Label, FormGroup, Input } from 'reactstrap'
import {
  updateDataProduct,
  getCategory,
  createProduct
} from 'actions/index'

interface StateProps {
  product: any,
  allCategory: []
}

interface DispatchProps {
  updateDataProduct: typeof updateDataProduct,
  getCategory: typeof getCategory,
  createProduct: typeof createProduct
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CreateProduct extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getCategory()
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'main_photo') {
      this.props.updateDataProduct({ prop: e.target.id, value: e.target.files })
      return
    }
    if (e.target.id === 'other_photo') {
      this.props.updateDataProduct({ prop: e.target.id, value: e.target.files })
      return
    }
    this.props.updateDataProduct({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.createProduct(this.props.product)
  }

  renderCategory () {
    const { allCategory } = this.props
    return allCategory.map((_data: any) => {
      return (
        <option key={_data.id} value={_data.id}>{_data.category_name}</option>
      )
    })
  }

  render () {
    if (!this.props.allCategory) return ''
    console.log(this.props.product)
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Product</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='product_name'>Product Name</Label>
                <Input type='text' id='product_name' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='description'>Description</Label>
                <Input type='textarea' id='description' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='detail'>Detail</Label>
                <Input type='textarea' id='detail' onChange={this.onInputChange} />
              </FormGroup>
              <Row>
                <Col xs='8'>
                  <FormGroup>
                    <Label className='label' for='weight'>Weight</Label>
                    <Input type='number' id='weight' onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
                <Col xs='4'>
                  <FormGroup>
                    <Label className='label' for='weight_in'>Size</Label>
                    <Input type='select' id='weight_in' onChange={this.onInputChange}>
                      <option defaultChecked={true}>Select</option>
                      <option value='gr'>gr/bag</option>
                      <option value='kg'>kg/bag</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label className='label' for='price'>Price</Label>
                <Input type='text' id='price' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='quantity'>Quantity</Label>
                <Input type='number' id='quantity' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='category'>Category</Label>
                <Input type='select' id='category' onChange={this.onInputChange}>
                  <option defaultChecked={true}>Select</option>
                  {this.renderCategory()}
                </Input>
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

const mapStateToProps = ({ product, category }: any) => {
  const { allCategory } = category

  return { product, allCategory }
}

export default connect(mapStateToProps, { updateDataProduct, getCategory, createProduct })(CreateProduct)
