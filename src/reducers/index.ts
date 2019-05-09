import { combineReducers } from 'redux'
import ProductReducer from './ProductReducer'
import CategoryProductReducer from './CategoryProductReducer'
import TripReducers from './TripReducers'
import DiscountReducer from './DiscountReducer'
import CouponReducer from './CouponReducer'
import BlogReducer from './BlogReducer'
import BannerReducer from './BannerReducer'
import AuthReducer from './AuthReducer'
import PickupMethodReducer from './PickupMethodReducer'
import TripPackageTypeReducer from './TripPackageTypeReducer'
import TransactionReducer from './TransactionReducer'
import UserReducer from './UserReducer'

const rootReducer = combineReducers({
  product: ProductReducer,
  category: CategoryProductReducer,
  trip: TripReducers,
  discount: DiscountReducer,
  coupon: CouponReducer,
  blog: BlogReducer,
  banner: BannerReducer,
  auth: AuthReducer,
  pickupmethod: PickupMethodReducer,
  trippackage: TripPackageTypeReducer,
  transaction: TransactionReducer,
  user: UserReducer
})

export default rootReducer
