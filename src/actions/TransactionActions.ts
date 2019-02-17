import axios from 'axios'
import querystring from 'querystring'
import { Dispatch } from 'redux'
import { GET_ALL_INVOICES, GET_INVOICE, UPDATE_DATA_INVOICE, TRACK_DELIVERY_SUCCESS, TRACK_DELIVERY_FAILED } from './types'

export const updateDataInvoice = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_INVOICE,
    payload: { prop, value }
  })
}

export const getAllInvoices = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/invoices')

  await getAllInvoicesSuccess(dispatch, res)
}

export const getInvoice = (id: number) => async (dispatch: Dispatch<any>) => {
  const res = await axios.get(`/invoice/${id}`)

  await getInvoiceSuccess(dispatch, res)
}

export const updateShipping = (data: any) => async () => {
  let idInvoice = data.idInvoice
  let awb = data.awb
  await axios.patch(`/invoice/${idInvoice}/shipping`, querystring.stringify({ awb }))

  await updateShippingSuccess()
}

export const trackDelivery = (idInvoice: number) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await axios.get(`/invoice/${idInvoice}/track`)

    await trackDeliverySuccess(dispatch, res)
  } catch (error) {
    await trackDeliveryFailed(dispatch)
  }
}

const getAllInvoicesSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_INVOICES,
    payload: res.data
  })
}

const getInvoiceSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_INVOICE,
    payload: res.data
  })
}

const updateShippingSuccess = () => {
  window.location.reload()
}

const trackDeliverySuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: TRACK_DELIVERY_SUCCESS,
    payload: res.data
  })
}

const trackDeliveryFailed = (dispatch: Dispatch<any>) => {
  dispatch({ type: TRACK_DELIVERY_FAILED })
}
