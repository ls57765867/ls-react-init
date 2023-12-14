// index.ts
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import VoteSliceReducer from './features/voteSlice'
import UserSliceReducer from './features/userSlice'

export * from './features/userSlice'
export * from './features/voteSlice'

import type { VoteState } from './features/voteSlice'

import type { UserState } from './features/userSlice'

export type StoreState = {
    vote: VoteState
    user: UserState
}

const store = configureStore({
    // 指定reducer
    reducer: {
        // 支持按模块管理
        vote: VoteSliceReducer,
        user: UserSliceReducer,
    },
    // toolkit默认包含了reduxThunk
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
