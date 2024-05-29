// File: src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, updateOrderStatus } from '../service/apiService';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const loadOrders = createAsyncThunk('orders/loadOrders', async (_, thunkAPI) => {
  try {
    const response = await fetchOrders();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const changeOrderStatus = createAsyncThunk('orders/changeOrderStatus', async (orderUpdate, thunkAPI) => {
  try {
    const response = await updateOrderStatus(orderUpdate);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        state.orders = state.orders.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        );
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;

export default orderSlice.reducer;
