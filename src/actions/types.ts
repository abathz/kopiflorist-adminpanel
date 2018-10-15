import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:1337/api'

export interface Action {
  type: string,
  payload?: any
}

// AUTH
export const UPDATE_DATA_LOGIN = 'UPDATE_DATA_LOGIN'
export const UPDATE_DATA_SIGNUP = 'UPDATE_DATA_SIGNUP'

// PRODUCT
export const UPDATE_DATA_PRODUCT = 'UPDATE_DATA_PRODUCT'
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT'
export const GET_PRODUCT = 'GET_PRODUCT'
export const UPDATE_DATA_CATEGORY = 'UPDATE_DATA_CATEGORY'
export const GET_ALL_CATEGORY = 'GET_ALL_CATEGORY'

// TRIP
export const UPDATE_DATA_TRIP = 'UPDATE_DATA_TRIP'
export const ADD_DATA_TABLE = 'ADD_DATA_TABLE'
export const GET_ALL_TRIP = 'GET_ALL_TRIP'
export const GET_TRIP = 'GET_TRIP'

// DISCOUNT
export const UPDATE_DATA_DISCOUNT = 'UPDATE_DATA_DISCOUNT'
export const GET_ALL_DISCOUNT = 'GET_ALL_DISCOUNT'
export const PRODUCT_CHECKED = 'PRODUCT_CHECKED'
export const PRODUCT_UNCHECKED = 'PRODUCT_UNCHECKED'
export const TRIP_CHECKED = 'TRIP_CHECKED'
export const TRIP_UNCHECKED = 'TRIP_UNCHECKED'
export const RESET_STATE_DISCOUNT = 'RESET_STATE_DISCOUNT'

// COUPON
export const UPDATE_DATA_COUPON = 'UPDATE_DATA_COUPON'
export const GET_ALL_COUPON = 'GET_ALL_COUPON'
export const GET_COUPON = 'GET_COUPON'

// BLOG
export const UPDATE_DATA_BLOG = 'UPDATE_DATA_BLOG'
export const GET_ALL_BLOG = 'GET_ALL_BLOG'
export const GET_BLOG = 'GET_BLOG'
export const RESET_STATE_BLOG = 'RESET_STATE_BLOG'

// BANNER
export const UPDATE_DATA_BANNER = 'UPDATE_DATA_BANNER'
export const GET_ALL_BANNER = 'GET_ALL_BANNER'
export const GET_BANNER = 'GET_BANNER'
