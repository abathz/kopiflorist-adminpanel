import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import TextEditorBlog from './TextEditorBlog'
import { Button, Row, Col, Form, Label, FormGroup, Input } from 'reactstrap'
import { updateDataBlog, createBlog } from 'actions'

interface StateProps {
  blog: any
}

interface DispatchProps {
  updateDataBlog: typeof updateDataBlog
  createBlog: typeof createBlog
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

class CreateBlog extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'photo') {
      this.props.updateDataBlog({ prop: e.target.id, value: e.target.files })
      return
    }
    this.props.updateDataBlog({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    this.props.createBlog(this.props.blog)
  }

  render () {
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Blog</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='12'>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col xs='8'>
                  <FormGroup>
                    <Label className='label' for='blog_title'>Blog Title</Label>
                    <Input type='text' id='blog_title' onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className='label' for='content'>Content</Label>
                    <TextEditorBlog />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs='8'>
                  <FormGroup>
                    <Label className='label' for='photo'>Header Image</Label>
                    <Input type='file' id='photo' onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Button className='px-5' color='primary'>Save</Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ blog }: any) => {
  return { blog }
}

export default connect(mapStateToProps, { updateDataBlog, createBlog })(CreateBlog)
