'use client';
import { Navigation_Reducer } from "@/store/reducers/navigations";
import { Category_Reducer } from "@/store/reducers/categories";
import { combineReducers, } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

const allReducers = combineReducers({
    Navigation: Navigation_Reducer,
    Category: Category_Reducer
})

const store = configureStore({
    reducer: allReducers,
    devTools: true,
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch