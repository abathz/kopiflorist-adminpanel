import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { getProduct, updateDataProduct, getCategory, editProduct, changeAvailabilityProduct } from 'actions'

interface StateProps {
  id: any
  product: any
  allCategory: []
}

interface DispatchProps {
  getProduct: typeof getProduct
  updateDataProduct: typeof updateDataProduct
  getCategory: typeof getCategory
  editProduct: typeof editProduct
  changeAvailabilityProduct: typeof changeAvailabilityProduct
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class EditProduct extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onMouseDownButtonAvailability = this.onMouseDownButtonAvailability.bind(this)
  }

  componentDidMount () {
    this.props.getProduct(this.props.id)
    this.props.getCategory()
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'main_photo_edited') {
      this.props.updateDataProduct({ prop: e.target.id, value: e.target.files })
      return
    }
    if (e.target.id === 'other_photo_edited') {
      this.props.updateDataProduct({ prop: e.target.id, value: e.target.files })
      return
    }
    this.props.updateDataProduct({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.editProduct(this.props.id, this.props.product)
  }

  onMouseDownButtonAvailability () {
    this.props.changeAvailabilityProduct(this.props.id)
  }

  renderCategory () {
    const { allCategory } = this.props
    return allCategory.map((_data: any) => {
      return (
        <option key={_data.id} value={_data.category_name}>{_data.category_name}</option>
      )
    })
  }

  renderPhotoList () {
    const { other_photo } = this.props.product
    if (!other_photo) return ''
    return other_photo.map((_data: any) => {
      return(
        <Col xs='4' key={_data} >
          <img className='img-fluid'src={_data} />
        </Col>
      )
    })
  }

  render () {
    const { product } = this.props
    console.log(product)
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
                <Input type='text' id='product_name' value={product.product_name} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='description'>Description</Label>
                <Input type='textarea' id='description' value={product.description} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='detail'>Detail</Label>
                <Input type='textarea' id='detail' value={product.detail} onChange={this.onInputChange} />
              </FormGroup>
              <Row>
                <Col xs='8'>
                  <FormGroup>
                    <Label className='label' for='weight'>Weight</Label>
                    <Input type='number' id='weight' value={product.weight} onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
                <Col xs='4'>
                  <FormGroup>
                    <Label className='label' for='weight_in'>Size</Label>
                    <Input type='select' id='weight_in' value={product.weight_in} onChange={this.onInputChange}>
                      <option defaultChecked={true}>Select</option>
                      <option value='gr'>gr/bag</option>
                      <option value='kg'>kg/bag</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label className='label' for='price'>Price</Label>
                <Input type='text' id='price' value={product.price} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='quantity'>Quantity</Label>
                <Input type='number' id='quantity' value={product.quantity} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='category'>Category</Label>
                <Input type='select' id='category' value={product.category} onChange={this.onInputChange}>
                  <option defaultChecked={true}>Select</option>
                  {this.renderCategory()}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label className='label' for='main_photo_edited'>Main Photo</Label>
                <Input type='file' id='main_photo_edited' multiple={true} onChange={this.onInputChange} />
              </FormGroup>
              <img className='img-fluid' src={product.main_photo} />
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
            <p className='label'>Availibility ({product.availability ? 'Active' : 'Inactive'})</p>
            <Button className='px-5' color='primary' onMouseDown={this.onMouseDownButtonAvailability}>{product.availability ? 'Inactive' : 'Active'}</Button>
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

export default connect(mapStateToProps, { getProduct, updateDataProduct, getCategory, editProduct, changeAvailabilityProduct })(EditProduct)
