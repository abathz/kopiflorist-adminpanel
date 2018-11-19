import axios from 'axios'
import querystring from 'querystring'
import { Dispatch } from 'redux'
import { UPDATE_DATA_TRIP, GET_ALL_TRIP, ADD_DATA_TABLE, GET_TRIP } from 'actions/types'

export const updateDataTrip = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_TRIP,
    payload: { prop, value }
  })
}

export const addDataTable = (data: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: ADD_DATA_TABLE,
    payload: data
  })
}

export const createTrip = (data: any) => async () => {
  const formData = new FormData()
  formData.append('trip_name', data.trip_name)
  formData.append('description', data.description)
  formData.append('location', data.location)
  formData.append('provide', data.provide)
  formData.append('trip_date', data.trip_date)
  formData.append('duration', data.duration)
  formData.append('price', data.price)
  formData.append('itinerary', data.dataTable)
  // for (const table of data.dataTable) {
  //   formData.append('time_itinerary[]', table.time)
  // }
  // for (const table of data.dataTable) {
  //   formData.append('activity_itinerary[]', table.activity)
  // }
  // for (const table of data.dataTable) {
  //   formData.append('description_itinerary[]', table.description)
  // }
  for (const photo of data.main_photo) {
    formData.append('main_photo', photo)
  }
  for (const photo of data.other_photo) {
    formData.append('other_photo', photo)
  }
  await axios.post('/create_trip', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  await createTripSuccess()
}

export const getAllTrip = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/trips')
  await getAllTripSuccess(dispatch, res)
}

export const getTrip = (id: number) => async (dispatch: Dispatch<any>) => {
  const res = await axios.get(`/trip/${id}`)
  await getTripSuccess(dispatch, res)
}

export const editTrip = (...data: any[]) => async (dispatch: Dispatch<any>) => {
  const formData = new FormData()
  formData.append('id', data[0])
  formData.append('trip_name', data[1].trip_name)
  formData.append('description', data[1].description)
  formData.append('location', data[1].location)
  formData.append('provide', data[1].provide)
  formData.append('trip_date', data[1].trip_date)
  formData.append('duration', data[1].duration)
  formData.append('price', data[1].price)
  for (const table of data[1].dataTable) {
    formData.append('time_itinerary[]', table.time)
  }
  for (const table of data[1].dataTable) {
    formData.append('activity_itinerary[]', table.activity)
  }
  for (const table of data[1].dataTable) {
    formData.append('description_itinerary[]', table.description)
  }
  for (const photo of data[1].main_photo_edited) {
    formData.append('main_photo', photo)
  }
  for (const photo of data[1].other_photo_edited) {
    formData.append('other_photo', photo)
  }

  await axios.post('/edit_trip', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  await editTripSuccess()
}

export const deleteTrip = (id: number) => async (dispatch: Dispatch<any>) => {
  await axios.delete('/delete_trip', { data: { id } })
  await window.location.reload()
}

export const changeAvailabilityTrip = (id: number) => async () => {
  await axios.post('/change_availability_trip', querystring.stringify({ id }))
  await changeAvailabilityTripSuccess()
}

const createTripSuccess = () => {
  window.location.href = '/coffee_trip'
}

const getAllTripSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_TRIP,
    payload: res.data
  })
}

const getTripSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_TRIP,
    payload: res.data
  })
}

const editTripSuccess = () => {
  window.location.href = '/coffee_trip'
}

const changeAvailabilityTripSuccess = () => {
  window.location.reload()
}
