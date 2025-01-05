import React, { useEffect, useRef } from 'react'
import ActiveChatHeader from './ActiveChatHeader'
import ActiveChatInput from './ActiveChatInput'
import {useSelector} from 'react-redux'
import {format} from 'timeago.js'

const ActiveChat = ({setChatInfo}) => {

    const {messages, currentChat: {profileImg: receiverProfileImg}, currentChat} = useSelector(state=>state.chats.data)
    const {uid, profileImg} = useSelector(state=>state.user.data)
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' });

    }, [messages]);    
    
  return (
    <div className="active-chat-container">
        <ActiveChatHeader setChatInfo={setChatInfo}/>
        {
            currentChat?.admin === undefined?(
                <div className="active-chat-messages-container">
                    {
                        messages.map((message, i)=>{
                            return (<div key={message?.createdAt?.seconds} className={`active-chat-message ${message?.senderId===uid?'owner':''}`}>
                                <div className='active-chat-message-img'>
                                    <img src={message?.senderId === uid?profileImg:receiverProfileImg} alt={message.senderId} className='profile-avatar'/>
                                </div>
                                <div className='active-chat-message-info'>
                                    <p>{message?.text}</p>
                                    <p>{format(message?.createdAt.toDate())}</p>
                                </div>
                            </div>)
                        })
                    }
                    <div ref={endRef}></div>
                </div>       
            ): (
                <div className="active-chat-messages-container">
                    {
                        messages.map((message, i)=>{
                            return (
                            <div key={message?.createdAt?.seconds} className={`active-chat-message ${message.senderId===uid?'owner':''}`}>
                                <div className='active-chat-message-img'>
                                    <img src={message?.profileImg} alt="" className='profile-avatar'/>
                                </div>
                                <div className='active-chat-message-info'>
                                    <p>
                                        <span>
                                            {message?.username.split(' ')[0]}
                                        </span>
                                        <span>
                                            {message?.text}
                                        </span>
                                       
                                    </p>
                                    <p>{format(message?.createdAt.toDate())}</p>
                                </div>
                            </div>)
                        })
                    }
                    <div ref={endRef}></div>
                </div>    
            )
        }
        <ActiveChatInput/>
    </div>
  )
}

export default ActiveChat