import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const totalItemsSelector = (state) => state.cart.totalItems; 
export default cartSlice.reducer;
