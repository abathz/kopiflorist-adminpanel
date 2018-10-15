import {
  UPDATE_DATA_CATEGORY,
  GET_ALL_CATEGORY,
  Action
} from 'actions/types'

interface State {
  category_name: string
  allCategory: []
}

const INITIAL_STATE: State = {
  category_name: '',
  allCategory: []
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_CATEGORY:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_CATEGORY:
      return { ...state, allCategory: action.payload.data }
    default:
      return state
  }
}
