import {
  Action,
  UPDATE_DATA_TRIP,
  GET_ALL_TRIP,
  ADD_DATA_TABLE,
  GET_TRIP
} from 'actions/types'

interface State {
  trip_name: string,
  description: string,
  location: string,
  trip_date: string,
  duration: number,
  provide: string,
  detail: string,
  price: number,
  main_photo: [],
  main_photo_edited: [],
  other_photo: [],
  other_photo_edited: [],
  availability: boolean,
  allTrip: []
  dataTable: any
  time_itinerary: string
  activity_itinerary: string
  description_itinerary: string
}

const INITAL_STATE: State = {
  trip_name: '',
  description: '',
  location: '',
  trip_date: '',
  duration: 0,
  provide: '',
  detail: '',
  price: 0,
  main_photo: [],
  main_photo_edited: [],
  other_photo: [],
  other_photo_edited: [],
  availability: false,
  allTrip: [],
  dataTable: [],
  time_itinerary: '',
  activity_itinerary: '',
  description_itinerary: ''
}

export default (state = INITAL_STATE, action: Action) => {
  switch (action.type) {
  case UPDATE_DATA_TRIP:
    return { ...state, [action.payload.prop]: action.payload.value }
  case ADD_DATA_TABLE:
    state.dataTable.push(action.payload)
    return { ...state }
  case GET_ALL_TRIP:
    return { ...state, allTrip: action.payload.data }
  case GET_TRIP:
    return {
      ...state,
      trip_name: action.payload.data.title,
      description: action.payload.data.description,
      location: action.payload.data.address,
      trip_date: action.payload.data.trip_date.substring(0, 10),
      duration: action.payload.data.duration,
      provide: action.payload.data.notes,
      price: action.payload.data.price,
      dataTable: action.payload.data.itinerary,
      main_photo: action.payload.data.main_photo,
      other_photo: action.payload.data.other_photo,
      availability: action.payload.data.availability
    }
  default:
    return state
  }
}
