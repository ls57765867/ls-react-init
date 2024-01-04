// index.ts
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import VoteSliceReducer from './features/voteSlice'
import UserSliceReducer from './features/userSlice'
import BaseSliceReducer from './features/baseSlice'

export * from './features/userSlice'
export * from './features/voteSlice'
export * from './features/baseSlice'

import type { VoteState } from './features/voteSlice'
import type { UserState } from './features/userSlice'
import type { BaseState } from './features/baseSlice'

export type StoreState = {
    vote: VoteState
    user: UserState
    base: BaseState
}

const store = configureStore({
    // 指定reducer
    reducer: {
        // 支持按模块管理
        vote: VoteSliceReducer,
        user: UserSliceReducer,
        base: BaseSliceReducer,
    },
    // toolkit默认包含了reduxThunk
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
