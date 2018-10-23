import { Action, UPDATE_DATA_DISCOUNT, PRODUCT_CHECKED, PRODUCT_UNCHECKED, GET_ALL_DISCOUNT, TRIP_CHECKED, TRIP_UNCHECKED, RESET_STATE_DISCOUNT } from 'actions/types'

interface State {
  discount_name: string
  description: string
  amount: number
  start_date: string
  end_date: string
  appliedfor: number
  product_checked: any
  trip_checked: any
  allDiscount: []
}

const INITIAL_STATE: State = {
  discount_name: '',
  description: '',
  amount: 0,
  start_date: '',
  end_date: '',
  appliedfor: 0,
  product_checked: [],
  trip_checked: [],
  allDiscount: []
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_DISCOUNT:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_DISCOUNT:
      return { ...state, allDiscount: action.payload.data }
    case PRODUCT_CHECKED:
      return { ...state, product_checked: [ ...state.product_checked, action.payload ] }
    case PRODUCT_UNCHECKED:
      const prunedProduct = state.product_checked.filter((item: any) => {
        return item !== action.payload
      })
      delete state.product_checked[action.payload]
      return { ...state, product_checked: prunedProduct }
    case TRIP_CHECKED:
      return { ...state, trip_checked: [...state.trip_checked, action.payload] }
    case TRIP_UNCHECKED:
      const prunedTrip = state.trip_checked.filter((item: any) => {
        return item !== action.payload
      })
      delete state.trip_checked[action.payload]
      return { ...state, trip_checked: prunedTrip }
    case RESET_STATE_DISCOUNT:
      return { ...state, appliedfor: 0 }
    default:
      return state
  }
}
