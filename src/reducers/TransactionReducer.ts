import { Action, GET_ALL_INVOICES, GET_INVOICE, UPDATE_DATA_INVOICE, TRACK_DELIVERY_SUCCESS, TRACK_DELIVERY_FAILED } from 'actions/types'

interface State {
  allInvoices: any[]
  invoice: any
  awb: string
  trackingDelivery: any
  isShipping?: boolean
}

const INITIAL_STATE: State = {
  allInvoices: [],
  invoice: {},
  awb: '',
  trackingDelivery:  {}
}

const TransactionReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_INVOICE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_INVOICES:
      return { ...state, allInvoices: action.payload.invoices }
    case GET_INVOICE:
      return { ...state, invoice: action.payload.invoice }
    case TRACK_DELIVERY_SUCCESS:
      return { ...state, trackingDelivery: action.payload.result, isShipping: true }
    case TRACK_DELIVERY_FAILED:
      return { ...state, isShipping: false }
    default:
      return { ...state }
  }
}

export default TransactionReducer
