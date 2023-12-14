import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
    name: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: 'zs',
    },
    reducers: {
        editName(state, { payload }) {
            state.name = payload
            console.log(state.name, 88)
        },
    },
})

export const { editName } = userSlice.actions
const sleep = async function (delay: number = 1000) {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, delay)
    })
}

export const delayEditName = () => {
    return async (dispatch: any) => {
        console.log('sleep start')
        await sleep()
        console.log('sleep end')
        dispatch(editName(Math.random()))
    }
}

export default userSlice.reducer
