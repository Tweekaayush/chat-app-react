import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth, signOut } from '../config/firebase'
import {useDispatch} from 'react-redux'
import { signOutUser } from '../features/userSlice'
import { clearAllChatData } from '../features/chatsSlice'
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'

const ChatListHeader = () => {

  const {uid, profileImg, username} = useSelector(state=>state.user.data)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const btnRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickOutside = (e) =>{
    if(ref.current && !ref.current.contains(e.target) && !btnRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  
  const handleClick = () =>{
    setOpen(!open)
  }

  const logout = () =>{
    if(uid){
      signOut(auth).then(()=>{
        dispatch(signOutUser())
        dispatch(clearAllChatData())
      })
    }
  }

  useEffect(()=>{

    window.addEventListener('click', handleClickOutside, true)
    return () => window.removeEventListener('click', handleClickOutside, true)

  }, [])

  return (
    <div className="header-user-info">
        <div className="header-user">
            
            <img src={profileImg} alt={username} />
            <h2>{username}</h2>
        </div>
        <div 
          className='more-details-dots' 
          onClick={handleClick} 
          ref={btnRef}
        >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <ul 
          className="more-detail-options-list" 
          style={{display: `${open?'flex':'none'}`}} 
          ref={ref}
        >
          <li className="more-detail-options" onClick={()=>navigate('/settings')}>
            <span>settings</span>
            <SettingsIcon />
          </li>
          <li className="more-detail-options" onClick={logout}>
            <span>logout</span>
            <LogoutIcon />
          </li>
        </ul>
    </div>
  )
}

export default ChatListHeader