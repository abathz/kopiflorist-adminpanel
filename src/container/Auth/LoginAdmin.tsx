import React, { Component, FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'routes'
import { updateDataLogin, signInAdmin } from 'actions'

interface StateProps {
  auth: any
}

interface DispatchProps {
  updateDataLogin: typeof updateDataLogin
  signInAdmin: typeof signInAdmin
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class LoginAdmin extends Component<PropsComponent, StateComponent> {

  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    this.props.updateDataLogin({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.signInAdmin(this.props.auth)
  }

  render () {
    return (
      <Container>
        <div className='d-flex flex-column align-items-center pt-5' style={{ height: '100vh' }}>
          <img style={{ width: '150px' }} className='mb-5' src='/static/img/logo.png' alt='Kopi Florist' />
          <div className='loginform'>
            <h3>Sign In</h3>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='example@mail.com' style={{ width: '300px' }} onChange={this.onInputChange}/>
              </FormGroup>
              <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='********' style={{ width: '300px' }} onChange={this.onInputChange}/>
              </FormGroup>
              <Button color='primary' className='float-right pr-5 pl-5'>Sign in</Button>
            </Form>
            <div className='clearfix' />
            <p className='float-right clearfix'>
              or{' '}
              <Link route='signup'>
                <a>Sign Up</a>
              </Link>{' '}
              here
            </p>
          </div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth }: any) => {
  return { auth }
}

export default connect(mapStateToProps, { updateDataLogin, signInAdmin })(LoginAdmin)
