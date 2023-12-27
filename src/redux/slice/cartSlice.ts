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
    addCart(state,{payload}) {
      state.cart.push(payload)
    },
    addItemQty(state,{payload}) {
      state.cart[payload].qty = state.cart[payload].qty +1
    },
    deleteCart(state, {payload}) {
      state.cart = state.cart.splice(payload,1)
    },
    cartItemAdded(state,{payload}){
      state.cart = payload

    },
    deleteAllCart(state){
      state.cart = initialState.cart
    }
    
  },
})

export const { addCart,deleteCart,addItemQty,cartItemAdded, deleteAllCart } = cartSlice.actions
export default cartSlice.reducer