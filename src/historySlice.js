import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: [],
  },
  reducers: {
    updateList: (state, action) => {
      state.value.push(action.payload);
    }
  },
})

export const { updateList } = historySlice.actions

export const historyList = (state) => state.history.value

export default historySlice.reducer