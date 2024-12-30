import React, { useEffect, useRef } from 'react'
import ActiveChatHeader from './ActiveChatHeader'
import ActiveChatInput from './ActiveChatInput'
import {useSelector} from 'react-redux'

const ActiveChat = () => {

    const {messages, currentChat: {profileImg: receiverProfileImg}} = useSelector(state=>state.chats.data)
    const {uid, profileImg} = useSelector(state=>state.user.data)
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);    
    
  return (
    <div className="active-chat-container">
        <ActiveChatHeader />
        <div className="active-chat-messages-container">
            {
                messages.map((message, i)=>{
                    return (<div key={message?.createdAt?.nanoseconds} className={`active-chat-message ${message.senderId===uid?'owner':''}`}>
                        <div className='active-chat-message-img'>
                            <img src={message.senderId === uid?profileImg:receiverProfileImg} alt="" />
                        </div>
                        <div className='active-chat-message-info'>
                            <p>{message.text}</p>
                            <p>{message.time}</p>
                        </div>
                    </div>)
                })
            }
            <div ref={endRef}></div>
        </div>
        <ActiveChatInput/>
    </div>
  )
}

export default ActiveChat