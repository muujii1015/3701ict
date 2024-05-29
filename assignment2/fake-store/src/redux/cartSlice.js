// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = "http://localhost:3000/";

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const response = await fetch(`${baseUrl}cart/${userId}`);
  const data = await response.json();
  await AsyncStorage.setItem('cart', JSON.stringify(data));
  return data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ userId, cart }) => {
  const response = await fetch(`${baseUrl}cart/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
  });
  const data = await response.json();
  await AsyncStorage.setItem('cart', JSON.stringify(data));
  return data;
});

export const clearCartAPI = createAsyncThunk('cart/clearCartAPI', async (userId) => {
  const response = await fetch(`${baseUrl}cart/${userId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  await AsyncStorage.removeItem('cart');
  return data;
});

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalItems++;
      state.totalPrice += newItem.price;
    },
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      const itemToRemove = state.items.find(item => item.id === idToRemove);
      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter(item => item.id !== idToRemove);
      }
    },
    increaseQuantity: (state, action) => {
      const idToIncrease = action.payload;
      const itemToIncrease = state.items.find(item => item.id === idToIncrease);
      if (itemToIncrease) {
        itemToIncrease.quantity++;
        state.totalItems++;
        state.totalPrice += itemToIncrease.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const idToDecrease = action.payload;
      const itemToDecrease = state.items.find(item => item.id === idToDecrease);
      if (itemToDecrease) {
        if (itemToDecrease.quantity === 1) {
          state.totalItems--;
          state.totalPrice -= itemToDecrease.price;
          state.items = state.items.filter(item => item.id !== idToDecrease);
        } else {
          itemToDecrease.quantity--;
          state.totalItems--;
          state.totalPrice -= itemToDecrease.price;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = action.payload.items.reduce((total, item) => total + item.price * item.quantity, 0);
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = action.payload.items.reduce((total, item) => total + item.price * item.quantity, 0);
      })
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
      });
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export const totalItemsSelector = (state) => state.cart.totalItems;
export const cartItemsSelector = (state) => state.cart.items;
export default cartSlice.reducer;
