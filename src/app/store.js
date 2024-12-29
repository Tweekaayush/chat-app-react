import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'

const rootReducer = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>
                getDefaultMiddleware({
                    serializableCheck: false
                })
})

export default store

