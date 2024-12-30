import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getChatList, getMessages } from '../features/chatsSlice'

const ChatsList = () => {

    const {chatList} = useSelector(state=>state.chats.data)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getChatList())
    }, [])

  return (
    <div className="chat-list-container">
        {
            chatList?.length !== 0?(
                chatList?.map((chat, i)=>{
                return <div key={i} className='chat-list-item' onClick={()=>dispatch(getMessages(chat))}>
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