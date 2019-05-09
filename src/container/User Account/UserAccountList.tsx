import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Table } from 'reactstrap'
import { getAllUsers } from 'actions'
import _ from 'lodash'

interface StateProps {
  allUsers: any[]
}

interface DispatchProps {
  getAllUsers: typeof getAllUsers
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class UserAccountList extends Component<PropsComponent, StateComponent> {
  componentDidMount () {
    this.props.getAllUsers()
  }

  renderDataTable () {
    const { allUsers } = this.props
    if (!allUsers) return <td/>
    return _.map(allUsers, (data: any, index: number) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.phone}</td>
          <td>{data.active ? 'Active' : 'Inactive'}</td>
        </tr>
      )
    })
  }
  render () {
    return (
      <>
        <h1>Registered Users</h1>
        <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
        <Table responsive={true} className='text-center table-custom' hover={true} bordered={true}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {this.renderDataTable()}
          </tbody>
        </Table>
      </>
    )
  }
}

const mapStateToProps = ({ user }: any) => {
  const { allUsers } = user

  return { allUsers }
}

export default connect(mapStateToProps, { getAllUsers })(UserAccountList)
