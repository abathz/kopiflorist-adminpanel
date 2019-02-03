import { Action, UPDATE_DATA_BANNER, GET_ALL_BANNER, GET_BANNER } from 'actions/types'

interface State {
  banner_title: string
  banner_url: string
  photo: any
  photo_edited: []
  allBanner: []
  bannerDetail: any
  availability: boolean
}

const INITIAL_STATE: State = {
  banner_title: '',
  banner_url: '',
  photo: '',
  photo_edited: [],
  allBanner: [],
  bannerDetail: {},
  availability: false
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_BANNER:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_BANNER:
      return { ...state, allBanner: action.payload.data }
    case GET_BANNER:
      return {
        ...state,
        banner_title: action.payload.data.name,
        banner_url: action.payload.data.url,
        photo: action.payload.data.photo,
        availability: action.payload.data.availability
      }
    default:
      return state
  }
}
