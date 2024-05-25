import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ProductState {
  product: any[]
}

const initialState:ProductState =  {
  product:[]
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addproduct(state,{payload}) {
      state.product.push(payload)
    },
    addItemQty(state,{payload}) {
      state.product[payload].qty = state.product[payload].qty +1
    },
    deleteproduct(state, {payload}) {
      state.product = state.product.splice(payload,1)
    },
    productItemAdded(state,{payload}){
      state.product = payload

    },
    deleteAllproduct(state){
      state.product = initialState.product
    },
    
  },
})

export const { addproduct,deleteproduct,addItemQty,productItemAdded, deleteAllproduct } = productSlice.actions
export default productSlice.reducer