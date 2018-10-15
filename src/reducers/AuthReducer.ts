import { Action, UPDATE_DATA_LOGIN, UPDATE_DATA_SIGNUP } from 'actions/types'

interface State {
  name: string
  email: string
  password: string
  phone: number
  gender: string
}

const INITIAL_STATE: State = {
  name: '',
  email: '',
  password: '',
  phone: 0,
  gender: ''
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_LOGIN:
      return { ...state, [action.payload.prop]: action.payload.value }
    case UPDATE_DATA_SIGNUP:
      return { ...state, [action.payload.prop]: action.payload.value }
    default:
      return state
  }
}
