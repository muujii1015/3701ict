import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice'; 

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: orderReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
