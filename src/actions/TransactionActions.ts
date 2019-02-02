import axios from 'axios'
import { Dispatch } from 'redux'
import { GET_ALL_INVOICES, GET_INVOICE } from './types'

export const getAllInvoices = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/invoices')

  await getAllInvoicesSuccess(dispatch, res)
}

export const getInvoice = (id: number) => async (dispatch: Dispatch<any>) => {
  const res = await axios.get(`/invoice/${id}`)

  await getInvoiceSuccess(dispatch, res)
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
