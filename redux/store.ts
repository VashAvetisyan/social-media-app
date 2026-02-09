import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slices/modalSlices'
import useSlice from './slices/userSlice'
import loadingSlice from './slices/loadingSlice'


export const store = configureStore({
	reducer: {
		modals: modalSlice,
		user: useSlice,
		loading: loadingSlice
	}
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch