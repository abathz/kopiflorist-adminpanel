import React, { Component, FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'
import { Button, Row, Col, Form, Label, FormGroup, Input } from 'reactstrap'
import { getBlog, updateDataBlog, editBlog, resetStateBlog } from 'actions/index'

interface StateProps {
  id: any
  blog: any
}

interface DispatchProps {
  getBlog: typeof getBlog
  updateDataBlog: typeof updateDataBlog
  editBlog: typeof editBlog
  resetStateBlog: typeof resetStateBlog
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

const TextEditorBlog = dynamic(import('./TextEditorBlog') as any, { ssr: false })

class EditBlog extends Component<PropsComponent, StateComponent> {
  editor: any
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getBlog(this.props.id)
  }

  componentWillUnmount () {
    this.props.resetStateBlog()
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'photo_edited') {
      this.props.updateDataBlog({ prop: e.target.id, value: e.target.files })
      return
    }
    this.props.updateDataBlog({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    const { id, blog } = this.props
    const data = {
      id,
      blog_title: blog.blog_title,
      content: blog.content,
      photo_edited: blog.photo_edited
    }
    this.props.editBlog(data)
  }

  render () {
    const { blog } = this.props
    console.log(blog)
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Edit Blog</h1>
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
                    <Input type='text' id='blog_title' value={blog.blog_title} onChange={this.onInputChange} />
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
                  <img className='img-fluid' src={blog.photo} alt={blog.blog_title} />
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

export default connect(mapStateToProps, { getBlog, updateDataBlog, editBlog, resetStateBlog })(EditBlog)
