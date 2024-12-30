import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import chatsReducer from '../features/chatsSlice'

const rootReducer = combineReducers({
    user: userReducer,
    chats: chatsReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>
                getDefaultMiddleware({
                    serializableCheck: false
                })
})

export default store

