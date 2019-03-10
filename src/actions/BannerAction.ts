import axios from 'axios'
import querystring from 'querystring'
import { Dispatch } from 'redux'
import { UPDATE_DATA_BANNER, GET_ALL_BANNER, GET_BANNER } from 'actions/types'

export const updateDataBanner = ({ prop, value }: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: UPDATE_DATA_BANNER,
    payload: { prop, value }
  })
}

export const createBanner = (data: any) => async () => {
  const formData = new FormData()
  formData.append('banner_title', data.banner_title)
  formData.append('banner_url', data.banner_url)
  for (const photo of data.photo) {
    formData.append('photo', photo)
  }

  await axios.post('/create_banner', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  await createBannerSuccess()
}

export const getAllBanner = () => async (dispatch: Dispatch<any>) => {
  const res = await axios.get('/banners')
  await getAllBannerSuccess(dispatch, res)
}

export const getBanner = (id: number) => async (dispatch: Dispatch<any>) => {
  const res = await axios.get(`/banner/${id}`)
  await getBannerSuccess(dispatch, res)
}

export const editBanner = (data: any) => async (dispatch: Dispatch<any>) => {
  const formData = new FormData()
  formData.append('id', data.id)
  formData.append('banner_title', data.banner_title)
  formData.append('banner_url', data.banner_url)
  for (const photo of data.photo_edited) {
    formData.append('photo', photo)
  }

  await axios.post('/edit_banner', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  await editBannerSuccess()
}

export const deleteBanner = (id: any) => async () => {
  await axios.delete('/delete_banner', { data: { id } })
  await deleteBannerSuccess()
}

export const changeAvailabilityBanner = (id: any) => async () => {
  await axios.post('/change_availability_banner', querystring.stringify({ id }))
  await changeAvailabilityBannerSuccess()
}

const createBannerSuccess = () => {
  window.location.href = '/banner'
}

const getAllBannerSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_ALL_BANNER,
    payload: res.data
  })
}

const getBannerSuccess = (dispatch: Dispatch<any>, res: any) => {
  dispatch({
    type: GET_BANNER,
    payload: res.data
  })
}

const editBannerSuccess = () => {
  window.location.href = '/banner'
}

const deleteBannerSuccess = () => {
  window.location.reload()
}

const changeAvailabilityBannerSuccess = () => {
  window.location.reload()
}
