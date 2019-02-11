import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Row, Col } from 'reactstrap'
import { Link } from 'routes'
import { getAllBanner,deleteBanner } from 'actions'

interface StateProps {
  allBanner: any
}

interface DispatchProps {
  getAllBanner: typeof getAllBanner
  deleteBanner: typeof deleteBanner
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class Banner extends Component<PropsComponent, StateComponent> {

  componentDidMount () {
    this.props.getAllBanner()
  }

  onDeleteClick = (id: number) => () => {
    this.props.deleteBanner(id)
  }

  renderDataTable () {
    const { allBanner } = this.props
    if (!allBanner) return ''
    return allBanner.map((_data: any) => {
      return (
        <tr key={_data.id}>
          <td className='pt-3'>{_data.id}</td>
          <td className='pt-3'>{_data.name}</td>
          <td className='pt-3'>{_data.availability ? 'Active' : 'Inactive'}</td>
          <td>
            <Link route='editbanner' params={{ id: _data.id }}><Button className='mr-1' color='primary' size='sm'>Edit</Button></Link>
            <Button color='danger' size='sm' onMouseDown={this.onDeleteClick(_data.id)}>Delete</Button>
          </td>
        </tr >
      )
    })
  }

  render () {
    return (
      <Row>
        <Col xs='12'>
          <h1>Banner List</h1>
          <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        </Col>
        <Col xs='12' className='text-right mb-3'>
          <Link route='createbanner'><Button color='primary'>+ Add</Button></Link>
        </Col>
        <Col xs='12'>
          <Table responsive={true} className='text-center table-custom' hover={true} bordered={true}>
            <thead>
              <tr>
                <th>No</th>
                <th>Banner Name</th>
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

const mapStateToProps = ({ banner }: any) => {
  const { allBanner } = banner

  return { allBanner }
}

export default connect(mapStateToProps, { getAllBanner, deleteBanner })(Banner)
