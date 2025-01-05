import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import db, { collection, getDoc, getDocs, query, where, or, and, setDoc, doc, arrayUnion, updateDoc, serverTimestamp, onSnapshot, arrayRemove } from '../config/firebase'

const initialState = {
    loading: false,
    error: '',
    data: {
        chatList: [],
        groupList: [],
        users: [],
        messages: [],
        currentChat: {},
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
        commonGroups: []
    }
}

export let unsubChat 
export let unsubMessage

export const addUser = createAsyncThunk('addUser', async(payload, {getState})=>{

    const userChatRef = collection(db, 'userChats')
    const chatRef = collection(db, 'chats')
    const uid = getState().user.data.uid

    try {
        const newChatRef = doc(chatRef)    

        await setDoc(newChatRef,{
            createdAt: serverTimestamp(),
            messages: []
        })
        await updateDoc(doc(userChatRef, uid),{
            chats: arrayUnion({
                chatId: newChatRef.id,
                lastMessage: '',
                receiverId: payload,
                updatedAt: Date.now()
            })
        })

        await updateDoc(doc(userChatRef, payload),{
            chats: arrayUnion({
                chatId: newChatRef.id,
                lastMessage: '',
                receiverId: uid,
                updatedAt: Date.now()
            })
        })


    } catch (error) {
        console.log(error) 
    }

})


export const addGroupChat = createAsyncThunk('addGroupChat', async(payload, {getState})=>{

    const userGroupRef = collection(db, 'groupChats')
    const chatRef = collection(db, 'chats')

    try {
        const newChatRef = doc(chatRef)    

        await setDoc(newChatRef,{
            createdAt: serverTimestamp(),
            messages: []
        })

        payload.members.forEach(async(member)=>{
            await updateDoc(doc(userGroupRef, member.uid),{
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    members: payload.members.filter((m)=>member.uid!==m.uid),
                    updatedAt: Date.now(), 
                    groupName: payload.groupName,
                    groupImg: payload.groupImg,
                    admin: payload.admin
                })
            })
        })

    } catch (error) {
        console.log(error) 
    }

})

export const getUsers = createAsyncThunk('getUsers', async(payload, {getState})=>{

    try {
        const querySnapshot = await getDocs(query(collection(db, 'users'), or(
            and(
              where('username', '>=', payload),
              where('username', '<=', payload + '\uf8ff')
            ),
            and(
              where('username', '>=', payload.charAt(0).toUpperCase() + payload.slice(1)),
              where('username', '<=', payload.charAt(0).toUpperCase() + payload.slice(1) + '\uf8ff')
            ),
            and(
              where('username', '>=', payload.toLowerCase()),
              where('username', '<=', payload.toLowerCase() + '\uf8ff')
            )
          )))

        if(!querySnapshot.empty){
            const userList = querySnapshot.docs.map((doc)=> doc.data())

            return userList
        }

    } catch (error) {
        return error
    }   

    return []
})

export const getChatList = createAsyncThunk('getChatList', async(payload, {getState, dispatch})=>{

    const {uid} = getState().user.data

        try {
            unsubChat = onSnapshot(doc(db, 'userChats', uid), async(docSnap)=>{                    
                const items = docSnap.data().chats
                const promises = items.map(async(item)=>{
                    const userDocSnap = await getDoc(doc(db, 'users', item.receiverId))
                    return {...item, ...userDocSnap.data()}
                })
                
                const chatData = await Promise.all(promises)
                
        
                dispatch(setChatList(chatData))
            })
            
        } catch (error) {
            console.log(error)
        }       
})

export const getGroupList = createAsyncThunk('getGroupList', async(payload, {getState, dispatch})=>{

    const {uid} = getState().user.data

        try {
            onSnapshot(doc(db, 'groupChats', uid), async(docSnap)=>{                    
                const items = docSnap.data().chats
                
                dispatch(setGroupList(items))
            })
            
        } catch (error) {
            console.log(error)
        }       
})


export const getMessages = createAsyncThunk('getMessages', async(payload, {dispatch})=>{
    try {
        unsubMessage = onSnapshot(doc(db, 'chats', payload.chatId), (res)=>{
            dispatch(setMessages({
                currentChat: payload, 
                messages: res.data().messages
            }))
        })  
    } catch (error) {
        console.log(error)
    }
})

export const sendMessages = createAsyncThunk('sendMessages', async(payload, {getState})=>{
    try {

        const {uid} = getState().user.data
        const {currentChat: {chatId, receiverId}} = getState().chats.data

        await updateDoc(doc(db, 'chats', chatId),{
            messages: arrayUnion({
                senderId: uid,
                text: payload, 
                createdAt: new Date()
            })
        })

        const userIds = [uid, receiverId]

        userIds.forEach(async(id)=>{
            const userChatSnapshot = await getDoc(doc(db, 'userChats', id))

            const userChatsData = userChatSnapshot.data()

            const chatIndex = userChatsData.chats.findIndex(c=>c.chatId === chatId)


            userChatsData.chats[chatIndex].lastMessage = payload
            userChatsData.chats[chatIndex].isSeen = id===uid
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(doc(db, 'userChats', id), {
                chats: userChatsData.chats,
            });
        })


    } catch (error) {
        console.log(error)
  }
})

export const sendGroupMessages = createAsyncThunk('sendGroupMessages', async(payload, {getState})=>{
    try {

        const {uid, profileImg, username} = getState().user.data
        const {currentChat: {chatId, members}} = getState().chats.data

        await updateDoc(doc(db, 'chats', chatId),{
            messages: arrayUnion({
                senderId: uid,
                text: payload, 
                username: username,
                profileImg: profileImg,
                createdAt: new Date()
            })
        })

        const userIds = [uid, ...members.map((m)=>m.uid)]

        userIds.forEach(async(id)=>{
            const userChatSnapshot = await getDoc(doc(db, 'groupChats', id))

            const userChatsData = userChatSnapshot.data()

            const chatIndex = userChatsData.chats.findIndex(c=>c.chatId === chatId)


            userChatsData.chats[chatIndex].lastMessage = payload
            userChatsData.chats[chatIndex].isSeen = id===uid
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(doc(db, 'groupChats', id), {
                chats: userChatsData.chats,
            });
        })


    } catch (error) {
        console.log(error)
  }
})

export const updateChatList = createAsyncThunk('updateChatList', async(payload, {getState})=>{

    const {uid} = getState().user.data

    const userChatsRef = doc(db, "userChats", uid);
        
    try {
      await updateDoc(userChatsRef, {
        chats: payload,
      });
    } catch (err) {
      console.log(err);
    }
})

export const updateGroupList = createAsyncThunk('updateGroupList', async(payload, {getState})=>{

    const {uid} = getState().user.data

    const userChatsRef = doc(db, "groupChats", uid);
        
    try {
      await updateDoc(userChatsRef, {
        chats: payload,
      });
    } catch (err) {
      console.log(err);
    }
})

export const toggleBlock = createAsyncThunk('toggleBlock', async(payload, {getState, dispatch})=>{

    try {
        const {uid} = getState().user.data
        const {isReceiverBlocked, currentChat: {receiverId}} = getState().chats.data

        await updateDoc(doc(db, 'users', uid), {
            blocked: isReceiverBlocked ? arrayRemove(receiverId) : arrayUnion(receiverId)
        })
        return !isReceiverBlocked
    } catch (error) {
        console.log(error)
        return error
    }
})

export const getCommonGroups = createAsyncThunk('getCommonGroups', async(payload, {getState, dispatch})=>{
    try {
        
        const {uid} = getState().user.data

        const userGroupData = await getDoc(doc(db, 'groupChats', uid))
        const receiverGroupData = await getDoc(doc(db, 'groupChats', payload))


        let commonGroup = []

        userGroupData.data().chats.forEach((userGroup)=>{
            receiverGroupData.data().chats.forEach((receiverGroup)=>{
                if(receiverGroup.chatId === userGroup.chatId){
                    commonGroup = [...commonGroup, userGroup]
                    return
                }
            })
        })

        return commonGroup

    } catch (error) {
        console.log(error)
    }
})

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        checkBlocked: (state,action)=>{
            if(action.payload.receiverBlockList.includes(action.payload.currentId)){
                state.data.isCurrentUserBlocked = true
            }else state.data.isCurrentUserBlocked = false
            if(action.payload.currentBlockList.includes(action.payload.receiverId)){
                state.data.isReceiverBlocked = true
            }else state.data.isReceiverBlocked = false
        },
        setMessages: (state, action)=>{
            state.data.currentChat = action.payload.currentChat
            state.data.messages = action.payload.messages
        },
        setChatList: (state, action)=>{
            state.data.chatList = action.payload
        },
        setGroupList: (state, action)=>{
            state.data.groupList = action.payload
        },
        clearAllChatData: (state)=>{
            state.data = {
                chatList: [],
                users: [],
                messages: [],
                currentChat: {},
                isCurrentUserBlocked: false,
                isReceiverBlocked: false
            }
        },
        clearCurrentChat: (state)=>{
            state.data.currentChat = {}
            state.data.messages = []
            state.data.isCurrentUserBlocked = false
            state.data.isReceiverBlocked = false
            state.data.commonGroups = []
        },
        clearUsers: (state)=>{
            state.data.users = []
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getUsers.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action)=>{
            state.loading = false
            state.data.users = action.payload
        })
        builder.addCase(getUsers.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(toggleBlock.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(toggleBlock.fulfilled, (state, action)=>{
            state.loading = false
            state.data.isReceiverBlocked = action.payload
        })
        builder.addCase(toggleBlock.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getCommonGroups.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getCommonGroups.fulfilled, (state, action)=>{
            state.loading = false
            state.data.commonGroups = action.payload
        })
        builder.addCase(getCommonGroups.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {setGroupList, checkBlocked, setMessages, setChatList, clearUsers, clearAllChatData, clearCurrentChat} = chatsSlice.actions

export default chatsSlice.reducer