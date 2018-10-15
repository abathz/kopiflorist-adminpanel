import { Dispatch } from 'redux'
import axios from 'axios'
import querystring from 'querystring'
import { UPDATE_DATA_LOGIN, UPDATE_DATA_SIGNUP } from './types'

export const updateDataLogin = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_LOGIN,
    payload: { prop, value }
  })
}

export const updateDataSignup = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_SIGNUP,
    payload: { prop, value }
  })
}

export const signInAdmin = (newData: any) => async () => {
  let data = {
    email: newData.email,
    password: newData.password
  }

  const res = await axios.post('/signin_admin', querystring.stringify(data))
  await signInAdminSuccess(res)
}

export const signUpAdmin = (newData: any) => async () => {
  let data = {
    name: newData.name,
    email: newData.email,
    password: newData.password,
    phone: newData.phone,
    gender: newData.gender
  }

  await axios.post('/signup_admin', querystring.stringify(data))
  await signUpAdminSuccess()
}

export const logout = () => {
  localStorage.clear()
  window.location.href = '/'
  return
}

const signUpAdminSuccess = () => {
  window.location.href = '/'
}

const signInAdminSuccess = (res: any) => {
  localStorage.setItem('session', res.data.token)
  window.location.href = '/dashboard'
}
