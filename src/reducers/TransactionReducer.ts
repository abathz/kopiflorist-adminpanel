import { Action, GET_ALL_INVOICES, GET_INVOICE, UPDATE_DATA_INVOICE } from 'actions/types'

interface State {
  allInvoices: any[]
  invoice: any
  awb: string
}

const INITIAL_STATE: State = {
  allInvoices: [],
  invoice: {},
  awb: ''
}

const TransactionReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_INVOICE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_INVOICES:
      return { ...state, allInvoices: action.payload.invoices }
    case GET_INVOICE:
      return { ...state, invoice: action.payload.invoice }
    default:
      return { ...state }
  }
}

export default TransactionReducer
