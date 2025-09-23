import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count: 0
}
export const countSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increase: (state) => {
            state.count++;
        },
        decrease: (state) => {
            state.count--;
        }
    }
})
export const countReduser = countSlice.reducer
export const { increase, decrease } = countSlice.actions