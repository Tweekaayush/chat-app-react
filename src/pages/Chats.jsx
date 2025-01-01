import React, { useEffect, useState } from 'react'
import ChatListHeader from '../components/ChatListHeader'
import ChatsList from '../components/ChatsList'
import SearchUser from '../components/SearchUser'
import ActiveChat from '../components/ActiveChat'
import AddUser from '../components/AddUser'
import {useSelector} from 'react-redux'
import UserInfo from '../components/UserInfo'

const Chats = () => {

    const [addUserStatus, setAddUserStatus] = useState(false)
    const {currentChat} = useSelector(state=>state.chats.data)
    const [search, setSearch] = useState('')

  return (
    <div className="container">
        <AddUser addUserStatus={addUserStatus} setAddUserStatus={setAddUserStatus}/>
        <div className="container-left">
            <ChatListHeader />
            <SearchUser setAddUserStatus={setAddUserStatus} search={search} setSearch={setSearch}/>
            <ChatsList search={search} />
        </div>
        <div className="container-right">
            {
                Object.keys(currentChat).length !== 0?(
                    <ActiveChat/>
                ): (
                    <div className='empty-chat-container'>
                        <h1>Select a chat to start a conversation.</h1>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Chats