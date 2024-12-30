import React, { useEffect, useState } from 'react'
import ChatListHeader from '../components/ChatListHeader'
import ChatsList from '../components/ChatsList'
import SearchUser from '../components/SearchUser'
import ActiveChat from '../components/ActiveChat'
import AddUser from '../components/AddUser'
import {useSelector} from 'react-redux'

const Chats = () => {

    const [addUserStatus, setAddUserStatus] = useState(false)
    const {currentChat} = useSelector(state=>state.chats.data)

  return (
    <div className="container">
        <AddUser addUserStatus={addUserStatus} setAddUserStatus={setAddUserStatus}/>
        <div className="container-left">
            <ChatListHeader />
            <SearchUser setAddUserStatus={setAddUserStatus}/>
            <ChatsList/>
        </div>
        <div className="container-right">
            {
                Object.keys(currentChat).length !== 0? <ActiveChat/> : <></>
            }
        </div>
    </div>
  )
}

export default Chats