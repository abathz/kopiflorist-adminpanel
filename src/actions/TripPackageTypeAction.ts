import axios from 'axios'
import querystring from 'querystring'
import { Dispatch } from 'redux'
import { UPDATE_DATA_TRIP_PACKAGE, GET_ALL_TRIP_PACKAGE } from './types'

export const updateDataPackage = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_TRIP_PACKAGE,
    payload: { prop, value }
  })
}

export const createTripPackage = (newData: any) => async (dispatch: Dispatch<any>) => {
  let data = {
    package_name: newData.package_name,
    min_participant: newData.min_participant,
    max_participant: newData.max_participant
  }

  await axios.post('/create_trip_package', querystring.stringify(data))
  await createTripPackageSuccess()
}

export const getAllTripPackage = () => async (dispatch: Dispatch) => {
  const res = await axios.get('/trip_package')
  await getAllTripPackageSuccess(dispatch, res.data)
}

export const deleteTripPackage = (id: number) => async (dispatch: Dispatch<any>) => {
  await axios.delete('/delete_trip_package', { data: { id } })
  await deleteTripPackageSuccess()
}

const createTripPackageSuccess = () => {
  window.location.reload()
}

const getAllTripPackageSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_TRIP_PACKAGE,
    payload: res
  })
}

const deleteTripPackageSuccess = () => {
  window.location.reload()
}
