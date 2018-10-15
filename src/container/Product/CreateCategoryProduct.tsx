import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap'
import {
  updateDataCategory,
  createCategory,
  getCategory,
  deleteCategory
} from 'actions/index'

interface StateProps {
  category_name: string,
  allCategory: any
}

interface DispatchProps {
  updateDataCategory: typeof updateDataCategory,
  createCategory: typeof createCategory,
  getCategory: typeof getCategory,
  deleteCategory: typeof deleteCategory
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CreateCategoryProduct extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getCategory()
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    this.props.updateDataCategory({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    const { category_name } = this.props
    this.props.createCategory(category_name)
  }

  deleteCategory (id: number) {
    this.props.deleteCategory(id)
  }

  renderDataTable () {
    const { allCategory } = this.props
    if (!this.props.allCategory) return <div/>
    return allCategory.map((_data: any) => {
      return (
        <tr key={_data.id}>
          <td className='pt-3'>{_data.id}</td>
          <td className='pt-3'>{_data.category_name}</td>
          <td><Button color='danger' size='sm' onClick={this.deleteCategory.bind(this, _data.id)}>Delete</Button></td>
        </tr>
      )
    })
  }

  render () {
    console.log(this.props.category_name)
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
                <Label className='label' for='category_name'>Category Name</Label>
                <Input type='text' id='category_name' onChange={this.onInputChange}/>
              </FormGroup>
              <Button block={true} color='primary'>Add</Button>
            </Form>
            <Table className='text-center table-custom' hover={true} bordered={true}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Category Name</th>
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

const mapStateToProps = ({ category }: any) => {
  const { category_name, allCategory } = category

  return { category_name, allCategory }
}

export default connect(mapStateToProps, {
  updateDataCategory,
  createCategory,
  getCategory,
  deleteCategory
})(CreateCategoryProduct)
