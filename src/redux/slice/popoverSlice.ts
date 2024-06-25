import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface popovertState {
    isPopover: boolean
}

const initialState:popovertState =  {
  isPopover:false
}

const popoverSlice = createSlice({
  name: 'popover',
  initialState,
  reducers: {
    showCartPopover(state,{payload}) {
      state.isPopover = payload
    },
   
  },
})

export const { showCartPopover } = popoverSlice.actions
export default popoverSlice.reducer