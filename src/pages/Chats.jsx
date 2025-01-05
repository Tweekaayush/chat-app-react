import React, { useEffect, useState } from 'react'
import ChatListHeader from '../components/ChatListHeader'
import ChatsList from '../components/ChatsList'
import SearchUser from '../components/SearchUser'
import ActiveChat from '../components/ActiveChat'
import AddUser from '../components/AddUser'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import GroupsIcon2 from '@mui/icons-material/Groups';
import AddGroup from '../components/AddGroup'
import CurrentChatInfo from '../components/CurrentChatInfo'

const Chats = () => {

    const [addUserStatus, setAddUserStatus] = useState(false)
    const [addGroupStatus, setAddGroupStatus] = useState(false)
    const {currentChat} = useSelector(state=>state.chats.data)
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(true)
    const [chatInfo, setChatInfo] = useState(false)
    const ref = useRef(null)

    const handleResize = () =>{
        let resizeTimer
        document.body.classList.add("stop-resize-animation");
        if(resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          document.body.classList.remove("stop-resize-animation");
        }, 400);
      }

    useEffect(()=>{
        if(Object.keys(currentChat).length !== 0) {
            setOpen(false)
            setChatInfo(false)
        }
            else setOpen(true)
    }, [currentChat])

    useEffect(()=>{
        document.title = 'ChatApp | Chats'    
        window.addEventListener('resize', handleResize)
        
        return () => window.removeEventListener('resize', handleResize)
      }, [])

  return (
    <div className="container">
        <div className="pg-overlay" style={{display: addUserStatus||addGroupStatus?'block':'none'}}></div>
        <AddUser addUserStatus={addUserStatus} setAddUserStatus={setAddUserStatus}/>
        <AddGroup addGroupStatus={addGroupStatus} setAddGroupStatus={setAddGroupStatus}/>
        <div className={`container-left ${open?'left-container-show':''}`} ref={ref}>
            <ChatListHeader />
            <SearchUser setAddUserStatus={setAddUserStatus} search={search} setSearch={setSearch}/>
            <ChatsList search={search}/>
            <div className="add-buttons">
                <div className="add-user-btn" onClick={()=>setAddUserStatus(true)}>
                    <span>+</span>
                </div>
                <div className="add-user-btn" onClick={()=>setAddGroupStatus(true)}>
                    <span>
                        <GroupsIcon2/>
                    </span>
                </div>
            </div>
        </div>
        <div className="container-right">
            {
                Object.keys(currentChat).length !== 0?(
                        !chatInfo?<ActiveChat setChatInfo={setChatInfo}/>: <CurrentChatInfo setChatInfo={setChatInfo}/>
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