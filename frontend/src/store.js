import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productCreateReducer,
  productUpdateReducer,
  productDetailsReducer,
  productDeleteReducer
} from './reducers/productReducers'

import {
  presupuestoListReducer,
  presupuestoCreateReducer,
  presupuestoUpdateReducer,
  presupuestoDetailsReducer,
  presupuestoDeleteReducer
} from './reducers/presupuestosReducers'

import {
  invoiceListReducer,
  invoiceCreateReducer,
  invoiceUpdateReducer,
  invoiceDetailsReducer,
  invoiceDeleteReducer
} from './reducers/invoiceReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  presupuestoList: presupuestoListReducer,
  presupuestoCreate: presupuestoCreateReducer,
  presupuestoUpdate: presupuestoUpdateReducer,
  presupuestoDetails: presupuestoDetailsReducer,
  presupuestoDelete: presupuestoDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  invoiceList: invoiceListReducer,
  invoiceCreate: invoiceCreateReducer,
  invoiceUpdate: invoiceUpdateReducer,
  invoiceDetails: invoiceDetailsReducer,
  invoiceDelet: invoiceDeleteReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
