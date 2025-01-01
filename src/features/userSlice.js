import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db, { collection, doc, getDoc, setDoc } from "../config/firebase";
import { getChatList } from "./chatsSlice";

const initialState = {
    loading: false,
    data: {
        uid: '',
        username: '',
        profileImg: '',
        email: '',
        status: '',
        blocked: []
    },
    error: ''
}

export const getUserDetails = createAsyncThunk('getUserDetails', async(payload, {getState, dispatch})=>{

    const snapshot = await getDoc(doc(db, 'users', payload.uid))

    if(snapshot.exists()){

        return snapshot.data()
    }else{
        await setDoc(doc(collection(db, 'users'), payload.uid),{
            ...payload,
            status: 'Hey there! I am using Chat App.',
            blocked: []
        })
        await setDoc(doc(collection(db, 'userChats'), payload.uid),{
            chats: []
        })
    }

    return {
        ...payload,
        status: 'Hey there! I am using Chat App.',
        blocked: []
    }
})

export const updateUser = createAsyncThunk('updateUser', async(payload, {getState})=>{

    const state = getState().user

    await setDoc(doc(collection(db, 'users'), state.data.uid ),{
        ...state.data,
        ...payload
    })

    return payload
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOutUser: (state)=>{
            state.data = {
                uid: '',
                username: '',
                profileImg: '',
                email: '',
                status: '',
                blocked: []
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getUserDetails.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getUserDetails.fulfilled, (state, action)=>{
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getUserDetails.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { signOutUser } = userSlice.actions

export default userSlice.reducer