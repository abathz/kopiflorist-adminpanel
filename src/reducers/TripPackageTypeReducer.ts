import { Action, UPDATE_DATA_TRIP_PACKAGE, GET_ALL_TRIP_PACKAGE } from 'actions/types'

interface State {
  package_name: string
  min_participant: number
  max_participant: number
  allTripPackage: any[]
}

const INITIAL_STATE: State = {
  package_name: '',
  min_participant: 0,
  max_participant: 0,
  allTripPackage: []
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_TRIP_PACKAGE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_TRIP_PACKAGE:
      return { ...state, allTripPackage: action.payload.data }
    default:
      return state
  }
}
