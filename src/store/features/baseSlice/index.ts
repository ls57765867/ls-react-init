import { createSlice } from '@reduxjs/toolkit'

export interface BaseState {
    fullscreenLoading: boolean
}

const baseSlice = createSlice({
    name: 'base',
    initialState: {
        fullscreenLoading: false,
    },
    reducers: {
        editFullLoading(state, { payload }) {
            state.fullscreenLoading = payload
            console.log(state.fullscreenLoading, 'fullscreenLoading')
        },
    },
})

export const { editFullLoading } = baseSlice.actions

export const delayEditFullLoading = (payload: boolean) => {
    return (dispatch: any) => {
        dispatch(editFullLoading(payload))
    }
}

export default baseSlice.reducer
