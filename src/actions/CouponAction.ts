import axios from 'axios'
import { Dispatch } from 'redux'
import querystring from 'querystring'
import { UPDATE_DATA_COUPON, GET_ALL_COUPON, GET_COUPON } from 'actions/types'

export const updateDataCoupon = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_COUPON,
    payload: { prop, value }
  })
}

export const createCoupon = (newData: any) => async (dispatch: Dispatch<any>) => {
  const data = {
    coupon_code: newData.coupon_code,
    discount_amount: newData.discount_amount,
    max_discount: newData.max_discount,
    min_price_discount: newData.min_price_discount,
    date_from: newData.date_from,
    date_to: newData.date_to
  }
  await axios.post('/create_coupon', querystring.stringify(data))
  await createCouponSuccess()
}

export const getAllCoupon = () => async (dispatch: Dispatch<any>) => {
  const coupon = await axios.get('/coupons')
  await getAllCouponSuccess(dispatch, coupon)
}

export const getCoupon = (id: any) => async (dispatch: Dispatch<any>) => {
  const res = await axios.get(`/coupon/${id}`)
  await console.log(res)
  await getCouponSuccess(dispatch, res)
}

export const editCoupon = (...data: any[]) => async (dispatch: Dispatch<any>) => {
  const coupon = {
    id: data[1],
    coupon_code: data[0].coupon_code,
    discount_amount: data[0].discount_amount,
    max_discount: data[0].max_discount,
    min_price_discount: data[0].min_price_discount,
    date_from: data[0].date_from,
    date_to: data[0].date_to
  }

  await axios.post('/edit_coupon', querystring.stringify(coupon))
  await editCouponSuccess()
}

export const deleteCoupon = (id: any) => async (dispatch: Dispatch<any>) => {
  await axios.delete('/delete_coupon', { data : { id } })
  await deleteCouponSuccess()
}

const createCouponSuccess = () => {
  window.location.href = '/coupon'
}

const getAllCouponSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_COUPON,
    payload: res.data
  })
}

const getCouponSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_COUPON,
    payload: res.data
  })
}

const editCouponSuccess = () => {
  window.location.href = '/coupon'
}

const deleteCouponSuccess = () => {
  window.location.reload()
}
