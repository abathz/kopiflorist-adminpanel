import { Action, GET_ALL_INVOICES, GET_INVOICE } from 'actions/types'

interface State {
  allInvoices: any[]
  invoice: any
}

const INITIAL_STATE: State = {
  allInvoices: [],
  invoice: {}
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case GET_ALL_INVOICES:
      return { ...state, allInvoices: action.payload.invoices }
    case GET_INVOICE:
      return { ...state, invoice: action.payload.invoice }
    default:
      return { ...state }
  }
}
