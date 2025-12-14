import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FavouriteItem {
  product_id?: string
  _id?: string
  [key: string]: unknown
}

interface FavouriteState {
  favourites: FavouriteItem[]
}

const initialState: FavouriteState = {
  favourites: [],
}

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavaourite(state, { payload }: PayloadAction<FavouriteItem | FavouriteItem[]>) {
      if (Array.isArray(payload)) {
        state.favourites = payload
        return
      }

      const productId = payload.product_id ?? payload._id
      if (!productId) {
        state.favourites.push(payload)
        return
      }

      const existingIndex = state.favourites.findIndex((item) => {
        const existingId = item.product_id ?? item._id
        return existingId === productId
      })

      if (existingIndex !== -1) {
        state.favourites[existingIndex] = payload
        return
      }

      state.favourites.push(payload)
    },
    removeFavourite(state, { payload }: PayloadAction<string>) {
      state.favourites = state.favourites.filter((item) => {
        const itemId = item.product_id ?? item._id
        return itemId !== payload
      })
    },
  },
})

export const { addFavaourite, removeFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer