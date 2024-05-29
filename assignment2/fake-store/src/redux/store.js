import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
