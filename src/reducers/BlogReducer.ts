import { Action, UPDATE_DATA_BLOG, GET_ALL_BLOG, GET_BLOG, RESET_STATE_BLOG } from 'actions/types'

interface State {
  blog_title: string
  content: any
  photo: []
  photo_edited: []
  allBlog: []
}

const INITIAL_STATE: State = {
  blog_title: '',
  content: '',
  photo: [],
  photo_edited: [],
  allBlog: []
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_BLOG:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_BLOG:
      return { ...state, allBlog: action.payload.data }
    case GET_BLOG:
      // let str = new Buffer(action.payload.data.content.data, 'base64')
      // let res = new TextDecoder('utf-8').decode(str)
      return {
        ...state,
        blog_title: action.payload.data.blog_title,
        content: action.payload.data.content,
        photo: action.payload.data.photo
      }
    case RESET_STATE_BLOG:
      return { ...state, content: '' }
    default:
      return state
  }
}
