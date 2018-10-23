import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module'
import { updateDataBlog } from 'actions/index'

interface StateProps {
  blog: any
}

interface DispatchProps {
  updateDataBlog: typeof updateDataBlog
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

Quill.register('modules/ImageResize', ImageResize)

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image']
  ],
  ImageResize: {}
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

class TextEditorBlog extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value: any) {
    this.props.updateDataBlog({ prop: 'content', value })
  }

  render () {
    const { blog } = this.props
    return (
      <>
        <ReactQuill
          value={blog.content}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
        />
      </>
    )
  }
}

const mapStateToProps = ({ blog }: any) => {
  return { blog }
}

export default connect(mapStateToProps, { updateDataBlog })(TextEditorBlog)
