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
      state.product = payload
    },
   
  },
})

export const { addproduct } = productSlice.actions
export default productSlice.reducer