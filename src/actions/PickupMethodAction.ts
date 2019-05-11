import axios from 'axios'
import { Dispatch } from 'redux'
import { UPDATE_DATA_PICKUP_METHOD, GET_ALL_PICKUP_METHOD } from './types'
import querystring from 'querystring'

export const updateDataPickupMethod = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_PICKUP_METHOD,
    payload: { prop, value }
  })
}

export const createPickupMethod = (newData: any) => async (dispatch: Dispatch<any>) => {
  await axios.post('/create_pickup_method', querystring.stringify(newData))
  await createPickupMethodSuccess()
}

export const getAllPickupMethod = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/pickup_method')
  await getAllPickupMethodSuccess(dispatch, res.data)
}

export const deletePickupMethod = (id: Number) => async (dispatch: Dispatch<any>) => {
  const res = await axios.delete('/delete_pickup_method', { data: { id: id } })
  await deletePickupMethodSuccess()
}

const createPickupMethodSuccess = () => {
  window.location.href = '/pickupmethod'
}

const getAllPickupMethodSuccess = (dispatch: Dispatch<any>, data: any) => {
  dispatch({
    type: GET_ALL_PICKUP_METHOD,
    payload: data
  })
}

const deletePickupMethodSuccess = () => {
  window.location.href = '/pickupmethod'
}
