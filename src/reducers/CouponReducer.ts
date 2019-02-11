import { Action, UPDATE_DATA_COUPON, GET_ALL_COUPON, GET_COUPON } from 'actions/types'

interface State {
  coupon_code: string
  discount_amount: number
  date_from: string
  date_to: string
  max_discount: number
  min_price_discount: number
  allCoupon: []
}

const INITIAL_STATE: State = {
  coupon_code: '',
  discount_amount: 0,
  date_from: '',
  date_to: '',
  max_discount: 0,
  min_price_discount: 0,
  allCoupon: []
}

const CouponReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_COUPON:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_COUPON:
      return { ...state, allCoupon: action.payload.data }
    case GET_COUPON:
      return {
        ...state,
        coupon_code: action.payload.data.coupon_code,
        discount_amount: action.payload.data.discount_amount,
        date_from: action.payload.data.date_from.substring(0, 10),
        date_to: action.payload.data.date_to.substring(0, 10),
        max_discount: action.payload.data.max_discount,
        min_price_discount: action.payload.data.min_price_discount
      }
    default:
      return state
  }
}

export default CouponReducer
