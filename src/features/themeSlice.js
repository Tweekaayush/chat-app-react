import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    theme: localStorage.getItem('chat-app-theme') || 'carbon'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action)=>{
            state.theme = action.payload
            localStorage.setItem('chat-app-theme', action.payload)
        }
    }
})

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer