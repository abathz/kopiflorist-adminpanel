import axios from 'axios'
import { Dispatch } from 'redux'
import { UPDATE_DATA_BLOG, GET_ALL_BLOG, GET_BLOG, RESET_STATE_BLOG } from 'actions/types'

export const updateDataBlog = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_BLOG,
    payload: { prop, value }
  })
}

export const createBlog = (data: any) => async (dispatch: Dispatch<any>) => {
  const formData = new FormData()
  formData.append('title', data.blog_title)
  formData.append('content', data.content)
  for (const photo of data.photo) {
    formData.append('photo', photo)
  }
  await axios.post('/create_blog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  await createBlogSuccess()
}

export const getAllBlog = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/blogs')
  await getAllBlogSuccess(dispatch, res)
}

export const getBlog = (id: any) => async (dispatch: Dispatch<any>) => {
  const res = await axios.get(`/blog/${id}`)
  await getBlogSuccess(dispatch, res)
}

export const editBlog = (data: any) => async (dispatch: Dispatch<any>) => {
  const formData = new FormData()
  formData.append('id', data.id)
  formData.append('title', data.blog_title)
  formData.append('content', data.content)
  for (const photo of data.photo_edited) {
    formData.append('photo', photo)
  }
  await axios.post('/edit_blog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  await editBlogSuccess()
}

export const deleteBlog = (id: any) => async (dispatch: Dispatch<any>) => {
  await axios.delete('/delete_blog', { data: { id } })
  await deleteBlogSuccess()
}

export const resetStateBlog = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: RESET_STATE_BLOG
  })
}

const createBlogSuccess = () => {
  window.location.href = '/blog'
}

const getAllBlogSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_BLOG,
    payload: res.data
  })
}

const getBlogSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_BLOG,
    payload: res.data
  })
}

const editBlogSuccess = () => {
  window.location.href = '/blog'
}

const deleteBlogSuccess = () => {
  window.location.reload()
}
