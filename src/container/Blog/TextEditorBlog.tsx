import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill'
import { updateDataBlog } from 'actions/index'
import { NextFunction } from 'express'
import { Buffer } from 'buffer'

interface StateProps {
  blog: any
}

interface DispatchProps {
  updateDataBlog: typeof updateDataBlog
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

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
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image']
      ]
    }
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]
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
