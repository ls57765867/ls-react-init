import { createSlice } from '@reduxjs/toolkit'

export interface VoteState {
    approve: number
    negative: number
}

const voteSlice = createSlice({
    name: 'vote',
    initialState: {
        approve: 10,
        negative: 20,
    },
    reducers: {
        addApprove(state, action) {
            state.approve += action.payload
        },
        addNegative(state, { payload }) {
            state.negative += payload
        },
        add(state, action) {
            state[action.payload.type as 'approve' | 'negative'] += action.payload.value
        },
    },
})

export const { addApprove, addNegative, add } = voteSlice.actions
export default voteSlice.reducer
