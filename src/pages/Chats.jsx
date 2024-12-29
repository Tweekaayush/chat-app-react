import React from 'react'
import ChatListHeader from '../components/ChatListHeader'
import ChatsList from '../components/ChatsList'
import SearchUser from '../components/SearchUser'
import ActiveChat from '../components/ActiveChat'

const Chats = () => {
  return (
    <div className="container">
        <div className="container-left">
            <ChatListHeader/>
            <SearchUser/>
            <ChatsList/>
        </div>
        <div className="container-right">
            <ActiveChat/>
        </div>
    </div>
  )
}

export default Chats