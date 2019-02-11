import React, { Component, FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { updateDataSignup, signUpAdmin } from 'actions'

interface StateProps {
  auth: any
}

interface DispatchProps {
  updateDataSignup: typeof updateDataSignup
  signUpAdmin: typeof signUpAdmin
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class LoginAdmin extends Component<PropsComponent, StateComponent> {

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateDataSignup({ prop: e.target.id, value: e.target.value })
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.signUpAdmin(this.props.auth)
  }

  render () {
    return (
      <Container>
        <div className='d-flex flex-column align-items-center mt-5 mb-5'>
          <img style={{ width: '150px' }} className='mb-5' src='/static/img/logo.png' alt='Kopi Florist' />
          <div className='loginform'>
            <h3>Sign Up</h3>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Nama</Label>
                <Input type='text' name='name' id='name' placeholder='John Doe' style={{ width: '300px' }} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='example@mail.com' style={{ width: '300px' }} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='********' style={{ width: '300px' }} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for='phone'>Phone</Label>
                <Input type='text' name='phone' id='phone' placeholder='08xxxxxxxxxx' style={{ width: '300px' }} onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for='gender'>Gender</Label>
                <Input type='select' id='gender' onChange={this.onInputChange}>
                  <option defaultChecked={true}>Select</option>
                  <option value={'male'}>Male</option>
                  <option value={'female'}>Female</option>
                </Input>
              </FormGroup>
              <Button color='primary' className='float-right pr-5 pl-5'>Sign Up</Button>
            </Form>
            <div className='clearfix' />
          </div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth }: any) => {
  return { auth }
}

export default connect(mapStateToProps, { updateDataSignup, signUpAdmin })(LoginAdmin)
