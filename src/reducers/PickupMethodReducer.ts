import { Action, UPDATE_DATA_PICKUP_METHOD, GET_ALL_PICKUP_METHOD } from 'actions/types'

interface State {
  pickup_method_name: string
  is_rajaongkir_supported: boolean
  self_pickup: boolean
  allPickupMethod: any[]
}

const INITIAL_STATE: State = {
  pickup_method_name: '',
  is_rajaongkir_supported: false,
  self_pickup: false,
  allPickupMethod: []
}

const PickupMethodReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_PICKUP_METHOD:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_PICKUP_METHOD:
      return { ...state, allPickupMethod: action.payload.data }
    default:
      return state
  }
}

export default PickupMethodReducer
