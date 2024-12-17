import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    searchTerm: "",
    cartItem: [],
    sortOrder: 'asc',
  },
  reducers: {
    searchCart: (state, action) => {
      state.searchTerm = action.payload;
    },
    addToCart: (state, action) => {
      const itemExist = state.cartItem.find(
        (item) => item.id === action.payload.id
      );
      if (itemExist) {
        state.cartItem = state.cartItem.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.cartItem = [...state.cartItem, { ...action.payload, qty: 1 }];
      }
    },
    updateCart: (state, action) => {
      state.cartItem = state.cartItem.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      );
    },
    removeCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload
      );
    },
    sortCart: (state) => {
      state.sortOrder = state.sortOrder==='asc'?'des':'asc';
    },
  },
});

export const { state, searchCart, addToCart, updateCart, removeCart ,sortCart} =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
