import axios from 'axios'
import { Dispatch } from 'redux'
import querystring from 'querystring'
import {
  UPDATE_DATA_DISCOUNT,
  GET_ALL_DISCOUNT,
  PRODUCT_CHECKED,
  PRODUCT_UNCHECKED,
  TRIP_CHECKED,
  TRIP_UNCHECKED,
  RESET_STATE_DISCOUNT
} from 'actions/types'

export const updateDataDiscount = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_DISCOUNT,
    payload: { prop, value }
  })
}

export const createDiscount = (newData: any) => async (dispatch: Dispatch<any>) => {
  const id = newData.trip_checked.length > 0 ? newData.trip_checked : newData.product_checked
  const data = {
    id,
    name: newData.discount_name,
    description: newData.description,
    discount_amount: newData.amount,
    date_from: newData.start_date,
    date_to: newData.end_date,
    appliedfor: newData.appliedfor
  }
  await axios.post('/create_discount', querystring.stringify(data))
  await createDiscountSuccess()
}

export const getAllDiscount = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/discounts')
  await getAllDiscountSuccess(dispatch, res)
}

export const productChecked = (value: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: PRODUCT_CHECKED,
    payload: value
  })
}

export const productUnchecked = (value: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: PRODUCT_UNCHECKED,
    payload: value
  })
}

export const tripChecked = (value: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: TRIP_CHECKED,
    payload: value
  })
}

export const tripUnchecked = (value: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: TRIP_UNCHECKED,
    payload: value
  })
}

export const resetStateDiscount = () => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: RESET_STATE_DISCOUNT
  })
}

const createDiscountSuccess = () => {
  window.location.href = '/discount'
}

const getAllDiscountSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_DISCOUNT,
    payload: res.data
  })
}
