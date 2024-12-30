import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { checkBlocked, getChatList, getMessages, updateChatList } from '../features/chatsSlice'

const ChatsList = () => {

    const {chatList} = useSelector(state=>state.chats.data)
    const {uid, blocked} = useSelector(state=>state.user.data)
    const dispatch = useDispatch()

    const handleClick = (chat) =>{
        dispatch(getMessages(chat))
        
        const chatIndex = chatList.findIndex(
            (item) => item.chatId === chat.chatId
        );

        dispatch(checkBlocked({
            currentId: uid,
            currentBlockList: blocked, 
            receiverId: chatList[chatIndex].receiverId, 
            receiverBlockList: chatList[chatIndex].blocked}))
        
        if(chatList[chatIndex].isSeen) return;

        let newChatList = []

        chatList.forEach((c)=>{
            if(c.chatId === chat.chatId){
                newChatList = [...newChatList, {...c, isSeen: true}]
            }else{
                newChatList = [...newChatList, c]
            }
        })

        dispatch(updateChatList(newChatList))
    }

    useEffect(()=>{
        dispatch(getChatList())
    }, [])

  return (
    <div className="chat-list-container">
        {
            chatList?.length !== 0?(
                chatList?.map((chat, i)=>{
                return <div key={i} className='chat-list-item' onClick={()=>handleClick(chat)} style={{backgroundColor: `${chat.isSeen?'':'indigo'}`}}>
                            <img src={chat.profileImg} alt={chat.username} />
                            <div>
                                <h2>{chat.username}</h2>
                                <p>{chat.lastMessage}</p>
                            </div>
                        </div>
                        
                })
            ):(<></>)
        }
    </div>
  )
}

export default ChatsList