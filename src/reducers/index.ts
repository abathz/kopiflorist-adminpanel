import { combineReducers } from 'redux'
import SimpleReducer from './SimpleReducer'

const rootReducer = combineReducers({
  simple: SimpleReducer
})

export default rootReducer
