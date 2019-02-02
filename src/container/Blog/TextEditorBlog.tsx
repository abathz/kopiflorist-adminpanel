import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDataBlog } from 'actions'
import { Editor } from '@tinymce/tinymce-react'

interface StateProps {
  blog: any
}

interface DispatchProps {
  updateDataBlog: typeof updateDataBlog
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent { }

const API = 'k8im9escmr0gvp1xvg6rwv53f1j7ndarvxpw3i7fcbdrzpz3'
const plugins = 'link image code autoresize'
const toolbar = 'undo redo | bold italic | alignleft aligncenter alignright | link image code'

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
        <Editor
          apiKey={API}
          value={blog.content}
          onEditorChange={this.handleChange}
          init={{
            plugins,
            toolbar,
            autoresize_bottom_margin: 20,
            image_title: true,
            file_picker_types: 'image',
            file_picker_callback: (cb: Function) => {
              let input: any = document.createElement('input')
              input.setAttribute('type', 'file')
              input.setAttribute('accept', 'image/*')

              input.onchange = function () {
                // tslint:disable-next-line:no-empty
                let tinymce: any
                let file = this.files[0]

                let reader: any = new FileReader()
                reader.onload = function () {
                  let id = 'blobid' + (new Date()).getTime()
                  let blobCache = tinymce.activeEditor.editorUpload.blobCache
                  let base64 = reader.result.split(',')[1]
                  let blobInfo = blobCache.create(id, file, base64)
                  blobCache.add(blobInfo)

                  cb(blobInfo.blobUri(), { title: file.name })
                }
                reader.readAsDataURL(file)
              }
              input.click()
            }
          }}
        />
      </>
    )
  }
}

const mapStateToProps = ({ blog }: any) => {
  return { blog }
}

export default connect(mapStateToProps, { updateDataBlog })(TextEditorBlog)
