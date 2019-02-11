import {
  Action,
  UPDATE_DATA_TRIP,
  GET_ALL_TRIP,
  ADD_DATA_TABLE,
  GET_TRIP
} from 'actions/types'
import _ from 'lodash'

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
  day: number
  time_itinerary: string
  activity_itinerary: string
  trip_package: any[]
  trip_package_edited: any[]
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
  day: 0,
  time_itinerary: '',
  activity_itinerary: '',
  trip_package: [],
  trip_package_edited: []
}

const TripReducer = (state = INITAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_TRIP:
      if (action.payload.prop === 'trip_package') {
        if (action.payload.value.isCreated) {
          state.trip_package.push(action.payload.value.data)
          return { ...state }
        }
        state.trip_package[Number(action.payload.value.index)].price = Number(action.payload.value.price)
        return { ...state }
      }
      return { ...state, [action.payload.prop]: action.payload.value }
    case ADD_DATA_TABLE:
      state.dataTable[Number(action.payload.day) - 1].push(action.payload)
      return { ...state }
    case GET_ALL_TRIP:
      return { ...state, allTrip: action.payload.data }
    case GET_TRIP:
      let arr = Array(Number(action.payload.data.duration))
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Array()
      }
      state.dataTable = arr

      _.map(action.payload.data.itinerary, (data: any, index: number) => {
        let dt = {
          day: data.day,
          time: data.time,
          activity: data.activity
        }
        state.dataTable[data.day - 1].push(dt)
      })

      return {
        ...state,
        trip_name: action.payload.data.title,
        description: action.payload.data.description,
        location: action.payload.data.address,
        trip_date: action.payload.data.trip_date.substring(0, 10),
        duration: action.payload.data.duration,
        provide: action.payload.data.notes,
        price: action.payload.data.price,
        main_photo: action.payload.data.main_photo,
        other_photo: action.payload.data.other_photo,
        availability: action.payload.data.availability,
        trip_package: action.payload.data.trip_package
      }
    default:
      return state
  }
}

export default TripReducer
