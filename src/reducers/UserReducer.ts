import { Action, GET_ALL_USERS } from 'actions/types'

interface State {
  allUsers: any[]
}

const INITIAL_STATE: State = {
  allUsers: []
}

const UserReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload.data }
    default:
      return state
  }
}

export default UserReducer
