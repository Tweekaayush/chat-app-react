import React from 'react'
import { useSelector } from 'react-redux'
import { auth, signOut } from '../config/firebase'
import {useDispatch} from 'react-redux'
import { signOutUser } from '../features/userSlice'
import { clearAllChatData } from '../features/chatsSlice'

const ChatListHeader = () => {

  const {uid, profileImg, username} = useSelector(state=>state.user.data)
  const dispatch = useDispatch()
  const logout = () =>{
    if(uid){
      signOut(auth).then(()=>{
        dispatch(signOutUser())
        dispatch(clearAllChatData())
      })
    }
  }
  return (
    <div className="header-user-info">
        <div className="header-user">
            
            <img src={profileImg} alt={username} />
            <h2>{username}</h2>
        </div>
        <div className='more-details-dots' onClick={logout}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </div>
  )
}

export default ChatListHeader