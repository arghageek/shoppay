import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {},
  },
});

// export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
