import {
  UPDATE_DATA_PRODUCT,
  GET_ALL_PRODUCT,
  Action,
  GET_PRODUCT
} from 'actions/types'

interface State {
  product_name: string
  description: string
  detail: string
  weight: number
  weight_in: string
  price: string
  quantity: number
  category: number
  quantity_edited: number
  category_edited: number
  availability: boolean
  main_photo: []
  other_photo: []
  main_photo_edited: []
  other_photo_edited: []
  allProduct: []
}

const INITIAL_STATE: State = {
  product_name: '',
  description: '',
  detail: '',
  weight: 0,
  weight_in: '',
  price: '',
  quantity: 0,
  category: 0,
  quantity_edited: 0,
  category_edited: 0,
  availability: false,
  main_photo: [],
  other_photo: [],
  main_photo_edited: [],
  other_photo_edited: [],
  allProduct: []
}

const ProductReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_DATA_PRODUCT:
      return { ...state, [action.payload.prop]: action.payload.value }
    case GET_ALL_PRODUCT:
      return { ...state, allProduct: action.payload.data }
    case GET_PRODUCT:
      return {
        ...state,
        product_name: action.payload.data.name,
        description: action.payload.data.description,
        detail: action.payload.data.detail,
        weight: action.payload.data.weight,
        weight_in: action.payload.data.weight_in,
        price: action.payload.data.price,
        quantity: action.payload.data.quantity,
        category: action.payload.data.category,
        availability: action.payload.data.availability,
        main_photo: action.payload.data.photo,
        other_photo: action.payload.data.other_photo
      }
    default:
      return state
  }
}

export default ProductReducer
