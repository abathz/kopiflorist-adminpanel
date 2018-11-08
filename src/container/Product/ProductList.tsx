import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Row, Col } from 'reactstrap'
import { Link } from 'routes'
import { getAllProduct, getCategory, deleteProduct } from 'actions/index'

interface StateProps {
  allProduct: []
  allCategory: []
}

interface DispatchProps {
  getAllProduct: typeof getAllProduct
  getCategory: typeof getCategory
  deleteProduct: typeof deleteProduct
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class ProductList extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)
  }

  componentDidMount () {
    this.props.getAllProduct()
  }

  onDeleteClick (id: any) {
    this.props.deleteProduct(id)
  }

  renderDataTable () {
    const { allProduct } = this.props
    if (!allProduct) return ''
    return allProduct.map((_data: any) => {
      return (
        <tr key={_data.id}>
          <td className='pt-3'>{_data.id}</td>
          <td className='pt-3'>{_data.name}</td>
          <td className='pt-3'>{_data.category}</td>
          <td className='pt-3'>{_data.price}</td>
          <td className='pt-3'>{_data.quantity}</td>
          <td className='pt-3'>{_data.availability ? 'Active' : 'Inactive'}</td>
          <td>
            <Link route='editproduct' params={{ id: _data.id }}><Button className='mr-1' color='primary' size='sm'>Edit</Button></Link>
            <Button color='danger' size='sm' onClick={this.onDeleteClick.bind(this, _data.id)}>Delete</Button>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <Row>
        <Col xs='12'>
          <h1>Product List</h1>
          <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        </Col>
        <Col xs='12' className='text-right mb-3'>
          <Link route='createcategoryproduct'><Button className='mr-3' color='primary'>Add Category</Button></Link>
          <Link route='createproduct'><Button color='primary'>Add</Button></Link>
        </Col>
        <Col xs='12'>
          <Table className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDataTable()}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ product, category }: any) => {
  const { allProduct } = product
  const { allCategory } = category

  return { allProduct, allCategory }
}

export default connect(mapStateToProps, { getAllProduct, getCategory, deleteProduct })(ProductList)
