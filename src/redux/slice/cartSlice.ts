import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  cart: any[]
}

const initialState:CartState =  {
  cart:[]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state,payload) {
      state.cart.push(payload)
    },
    deleteCart(state, payload) {
      state.cart = state.cart.splice(1,1)
    },
    deleteAllCart(state){
      state.cart = initialState.cart
    }
    
  },
})

export const { addCart,deleteCart, deleteAllCart } = cartSlice.actions
export default cartSlice.reducer