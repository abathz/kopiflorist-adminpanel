import axios from 'axios'
import { Dispatch } from 'redux'
import { GET_ALL_USERS } from './types'

export const getAllUsers = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/users')
  await getAllUsersSuccess(dispatch, res.data)
}

const getAllUsersSuccess = (dispatch: Dispatch<any>, data: any) => {
  dispatch({
    type: GET_ALL_USERS,
    payload: data
  })
}
