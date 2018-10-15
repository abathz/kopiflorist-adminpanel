import { UPDATE_DATA_PRODUCT, GET_ALL_PRODUCT, GET_PRODUCT } from './types'
import { Dispatch } from 'redux'
import axios from 'axios'
import querystring from 'querystring'

export const updateDataProduct = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_PRODUCT,
    payload: { prop, value }
  })
}

export const createProduct = (data: any) => async () => {
  const formData = new FormData()
  formData.append('product_name', data.product_name)
  formData.append('description', data.description)
  formData.append('detail', data.detail)
  formData.append('price', data.price)
  formData.append('weight', data.weight)
  formData.append('weight_in', data.weight_in)
  formData.append('category', data.category)
  formData.append('quantity', data.quantity)
  for (const photo of data.main_photo) {
    formData.append('main_photo', photo)
  }
  for (const photo of data.other_photo) {
    formData.append('other_photo', photo)
  }
  await axios.post('/create_product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  await createProductSuccess()
}

export const getAllProduct = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/products')
  await getAllProductSuccess(dispatch, res)
}

export const getProduct = (id: any) => async (dispatch: Dispatch<any>) => {
  const res = await axios.get(`/product/${id}`)
  await getProductSuccess(dispatch, res)
}

export const editProduct = (...data: any[]) => async () => {
  const formData = new FormData()
  formData.append('id', data[0])
  formData.append('product_name', data[1].product_name)
  formData.append('description', data[1].description)
  formData.append('detail', data[1].detail)
  formData.append('price', data[1].price)
  formData.append('weight', data[1].weight)
  formData.append('weight_in', data[1].weight_in)
  formData.append('category', data[1].category)
  formData.append('quantity', data[1].quantity)
  for (const photo of data[1].main_photo_edited) {
    formData.append('main_photo', photo)
  }
  for (const photo of data[1].other_photo_edited) {
    formData.append('other_photo', photo)
  }
  await axios.post('/edit_product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  await editProductSuccess()
}

export const deleteProduct = (id: any) => async () => {
  await axios.delete('/delete_product', { data: { id } })
  await deleteProductSuccess()
}

export const changeAvailabilityProduct = (id: any) => async () => {
  await axios.post('/change_availability_product', querystring.stringify({ id }))
  await changeAvailabilityProductSuccess()
}

const createProductSuccess = () => {
  window.location.href = '/product'
}

const getAllProductSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_PRODUCT,
    payload: res.data
  })
}

const getProductSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_PRODUCT,
    payload: res.data
  })
}

const editProductSuccess = () => {
  window.location.href = '/product'
}

const deleteProductSuccess = () => {
  window.location.reload()
}

const changeAvailabilityProductSuccess = () => {
  window.location.reload()
}
