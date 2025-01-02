import React, { useEffect, useState } from 'react'
import ChatListHeader from '../components/ChatListHeader'
import ChatsList from '../components/ChatsList'
import SearchUser from '../components/SearchUser'
import ActiveChat from '../components/ActiveChat'
import AddUser from '../components/AddUser'
import {useSelector} from 'react-redux'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRef } from 'react'

const Chats = () => {

    const [addUserStatus, setAddUserStatus] = useState(false)
    const {currentChat} = useSelector(state=>state.chats.data)
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(true)
    const ref = useRef(null)

    const handleClickOutside = () =>{
        if(window.innerWidth >= 768)
            setOpen(true)
    }

    useEffect(()=>{
        window.addEventListener('resize', handleClickOutside)
        document.title = 'ChatApp | Chats'
        return ()=>window.removeEventListener('resize', handleClickOutside)
      }, [])
    

  return (
    <div className="container">
        <AddUser addUserStatus={addUserStatus} setAddUserStatus={setAddUserStatus}/>
        <div className={`container-left ${open?'left-container-show':''}`} ref={ref}>
            <ChatListHeader />
            <SearchUser setAddUserStatus={setAddUserStatus} search={search} setSearch={setSearch}/>
            <ChatsList search={search} setOpen={setOpen} />
            <button onClick={()=>setOpen(!open)}>
                <ChevronRightIcon style={{transform: `${open?'rotate(180deg)':''}`}}/>
            </button>
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