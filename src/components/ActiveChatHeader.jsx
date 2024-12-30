import React from 'react'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch} from 'react-redux'
import { clearCurrentChat } from '../features/chatsSlice';

const ActiveChatHeader = () => {

  const {currentChat: {username, profileImg}} = useSelector(state=>state.chats.data)
  const dispatch = useDispatch()

  const handleBack = () =>{
    dispatch(clearCurrentChat())
  }

  return (
    <div className="active-chat-header">
        <div className="active-chat-header-info">
            <ArrowBackIcon onClick={handleBack}/>
            <img src={profileImg} alt={username} />
            <h2>{username}</h2>
        </div>
    </div>
  )
}

export default ActiveChatHeader