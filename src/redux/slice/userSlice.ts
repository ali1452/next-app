import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: any | null
}

const initialState: UserState = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<any>) {
      state.user = payload
    },
    clearUser(state) {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
