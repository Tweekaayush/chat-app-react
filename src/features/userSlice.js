import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db, { collection, doc, getDoc, setDoc } from "../config/firebase";

const initialState = {
    loading: false,
    data: {
        uid: '',
        username: '',
        profileImg: '',
        email: '',
        chats: []
    },
    error: ''
}

export const getUserDetails = createAsyncThunk('getUserDetails', async(payload)=>{

    const snapshot = await getDoc(doc(db, 'users', payload.uid))

    if(snapshot.exists()){
        const chatSnapshot = await getDoc(doc(db, 'userChats', payload.uid))

        // const chats = chatSnapshot.data()

        // const promises = chats.map(async(chat)=>{
        //     const userDocSnap = await getDoc(doc(db, 'users', chat.receiverId))
        //     return {...chat, ...userDocSnap.data()}
        // })

        // const chatData = await promises.all(promises)

        // chatData.sort((a, b) => b.updatedAt - a.updatedAt)

        return { ...snapshot.data(), chats: []}
    }else{
        await setDoc(doc(collection(db, 'users'), payload.uid),{
            ...payload,
            blocked: []
        })
        await setDoc(doc(collection(db, 'userChats'), payload.uid),{
            chats: []
        })
    }

    return {
        ...payload,
        blocked: [],
        chats: []
    }
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
                chats: []
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