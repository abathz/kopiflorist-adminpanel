import React, { Component, FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Form, Label, FormGroup, Input } from 'reactstrap'
import { updateDataBanner, createBanner } from 'actions'

interface StateProps {
  banner: any
}

interface DispatchProps {
  updateDataBanner: typeof updateDataBanner
  createBanner: typeof createBanner
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CreateBanner extends Component<PropsComponent, StateComponent> {
  constructor (props: PropsComponent) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'photo') {
      this.props.updateDataBanner({ prop: e.target.id, value: e.target.files })
      return
    }
    this.props.updateDataBanner({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.createBanner(this.props.banner)
  }

  render () {
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Banner</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='banner_title'>Banner Name</Label>
                <Input type='text' id='banner_title' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='banner_url'>URL</Label>
                <Input type='text' id='banner_url' onChange={this.onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label className='label' for='photo'>Photo</Label>
                <Input type='file' id='photo' onChange={this.onInputChange}/>
              </FormGroup>
              <Button className='px-5' color='primary'>Save</Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ banner }: any) => {
  return { banner }
}

export default connect(mapStateToProps, { updateDataBanner, createBanner })(CreateBanner)
