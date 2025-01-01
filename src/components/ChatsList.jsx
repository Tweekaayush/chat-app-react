import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { checkBlocked, getChatList, getMessages, unsubChat, updateChatList } from '../features/chatsSlice'
import { format } from 'timeago.js'

const ChatsList = ({search, setOpen}) => {

    const {chatList} = useSelector(state=>state.chats.data)
    const {uid, blocked} = useSelector(state=>state.user.data)
    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const handleClick = (chat) =>{

        setOpen(false)

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

    useEffect(()=>{
        setList(chatList)
    }, [chatList])

    useEffect(()=>{
        if(search !== ''){
            setList(chatList.filter((item)=>{
                return item.username.toLowerCase().includes(search.toLowerCase())
            }))
        }else{
            setList(chatList)
        }
    }, [search])

  return (
    <div className="chat-list-container">
        {
            list?.length !== 0?(
                list?.map((chat, i)=>{
                return <div key={i} className={`${chat.isSeen?'chat-list-item':'chat-list-item unseen'}`} onClick={()=>handleClick(chat)} title={chat.username}>
                            <img src={chat.profileImg} alt={chat.username} className='profile-avatar' />
                            <div>
                                <h2>{chat.username}</h2>
                                {  chat.lastMessage &&
                                    <p>{chat.lastMessage}  
                                        <span>
                                            • {format(chat.updatedAt)}
                                        </span>
                                    </p>
                                }
                            </div>
                        </div>
                        
                })
            ):(<></>)
        }
    </div>
  )
}

export default ChatsList