import axios from 'axios'
import querystring from 'querystring'
import { Dispatch } from 'redux'
import {
  UPDATE_DATA_CATEGORY,
  GET_ALL_CATEGORY
} from './types'

export const updateDataCategory = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_CATEGORY,
    payload: { prop, value }
  })
}

export const createCategory = (category: string) => async () => {
  await axios.post('/create_category', querystring.stringify({ category }))
  await createCategorySuccess()
}

export const getCategory = () => async (dispatch: Dispatch<any>) => {
  const data = await axios.get('/categories')
  await getCategorySuccess(dispatch, data)
}

export const deleteCategory = (id: number) => async () => {
  await axios.delete('/delete_category', { data: { id } })
  await deleteCategorySuccess()
}

const createCategorySuccess = () => {
  window.location.reload()
}

const getCategorySuccess = (dispatch: Dispatch<any>, data: any) => {
  dispatch({
    type: GET_ALL_CATEGORY,
    payload: data.data
  })
}

const deleteCategorySuccess = () => {
  window.location.reload()
}
