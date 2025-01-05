import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { checkBlocked, getChatList, getCommonGroups, getGroupList, getMessages, updateChatList, updateGroupList } from '../features/chatsSlice'
import { format } from 'timeago.js'

const ChatsList = ({search}) => {

    const {chatList, groupList, currentChat} = useSelector(state=>state.chats.data)
    const {uid, blocked} = useSelector(state=>state.user.data)
    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const handleGroupClick = (group) =>{

        dispatch(getMessages(group))
        const chatIndex = chatList.findIndex(
            (item) => item.chatId === group.chatId
        );

        if(groupList[chatIndex]?.isSeen) return;

        let newChatList = []

        groupList.forEach((c)=>{
            if(c.chatId === group.chatId){
                newChatList = [...newChatList, {...c, isSeen: true}]
            }else{
                newChatList = [...newChatList, c]
            }
        })

        dispatch(updateGroupList(newChatList))

    }

    const handleClick = (chat) =>{

        if(chat.chatId === currentChat.chatId) return

        dispatch(getMessages(chat))
        dispatch(getCommonGroups(chat.uid))
        
        const chatIndex = chatList.findIndex(
            (item) => item.chatId === chat.chatId
        );

        dispatch(checkBlocked({
            currentId: uid,
            currentBlockList: blocked, 
            receiverId: chatList[chatIndex].receiverId, 
            receiverBlockList: chatList[chatIndex].blocked}))
        
        if(chatList[chatIndex]?.isSeen) return;

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
        dispatch(getGroupList())
    }, [])


    useEffect(()=>{
        setList([...chatList, ...groupList].sort((a,b)=> b.updatedAt - a.updatedAt))
    }, [chatList, groupList])


    useEffect(()=>{
        if(search !== ''){
            setList([...chatList.filter((item)=>{
                    return item.username.toLowerCase().includes(search.toLowerCase())
                }),
                ...groupList.filter((item)=>{
                    return item.groupName.toLowerCase().includes(search.toLowerCase())
                })
            ].sort((a,b)=> b.updatedAt - a.updatedAt))
        }else{
            setList([...chatList, ...groupList].sort((a,b)=> b.updatedAt - a.updatedAt))
        }
    }, [search, groupList, chatList])


  return (
    <div className="chat-list-container">
        {
            list?.length !== 0?(
                list?.map((chat)=>{
                return chat?.admin === undefined?( 
                        <div key={chat.chatId} className={`${chat.isSeen?'chat-list-item':'chat-list-item unseen'}`} onClick={()=>handleClick(chat)}>
                            <img src={chat.profileImg} alt={chat.username} className='profile-avatar' />
                            <div>
                                <h2>{chat.username}</h2>
                                {  chat.lastMessage && 
                                <div>
                                    <p>
                                        {chat.lastMessage}  
                                    </p>
                                    <span>
                                        • {format(chat.updatedAt)}
                                    </span>
                                </div>
                                }
                            </div>
                        </div>
                    ):(
                        <div key={chat.chatId} className={`${chat.isSeen?'chat-list-item':'chat-list-item unseen'}`} onClick={()=>handleGroupClick(chat)}>
                            <img src={chat.groupImg} alt={chat.groupName} className='profile-avatar' />
                            <div>
                                <h2>{chat.groupName}</h2>
                                {  chat.lastMessage &&
                                    <div>
                                        <p>
                                            {chat.lastMessage}  
                                        </p>
                                        <span>
                                            • {format(chat.updatedAt)}
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                        
                })
            ):(<></>)
        }
    </div>
  )
}

export default ChatsList