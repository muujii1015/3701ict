import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl = "http://localhost:3000/";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk('orders/createOrder', async (order, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await fetch(`${baseUrl}orders/neworder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`, 
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message || 'Failed to create order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
