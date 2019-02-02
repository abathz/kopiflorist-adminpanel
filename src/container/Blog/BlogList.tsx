import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Row, Col } from 'reactstrap'
import { Link } from 'routes'
import { getAllBlog, deleteBlog } from 'actions'
import moment from 'moment'

interface StateProps {
  allBlog: any
}

interface DispatchProps {
  getAllBlog: typeof getAllBlog
  deleteBlog: typeof deleteBlog
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class BlogList extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getAllBlog()
  }

  onDeleteClick (id: any) {
    this.props.deleteBlog(id)
  }

  renderDataTable () {
    const { allBlog } = this.props
    if (!allBlog) return ''
    return allBlog.map((_data: any) => {
      const dateCreated = _data.date_created.substring(0, 10)
      const date = moment(dateCreated).format('DD M YYYY')
      return (
        <tr key={_data.id}>
          <td className='pt-3'>{_data.id}</td>
          <td className='pt-3'>{_data.blog_title}</td>
          <td className='pt-3'>{`/${_data.slug}`}</td>
          <td className='pt-3'>{date}</td>
          <td>
            <Link route='editblog' params={{ id: _data.id }}><Button color='primary' className='mr-1' size='sm'>Edit</Button></Link>
            <Button color='danger' size='sm' onMouseDown={this.onDeleteClick.bind(this, _data.id)}>Delete</Button>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <Row>
        <Col xs='12'>
          <h1>Blog List</h1>
          <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        </Col>
        <Col xs='12' className='text-right mb-3'>
          <Link route='createblog'><Button color='primary'>+ Add</Button></Link>
        </Col>
        <Col xs='12'>
          <Table className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>No</th>
                <th>Blog Title</th>
                <th>URL slug</th>
                <th>Date & Time</th>
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

const mapStateToProps = ({ blog }: any) => {
  const { allBlog } = blog

  return { allBlog }
}

export default connect(mapStateToProps, { getAllBlog, deleteBlog })(BlogList)
