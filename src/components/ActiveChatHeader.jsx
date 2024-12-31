import React from 'react'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch} from 'react-redux'
import { clearCurrentChat, toggleBlock } from '../features/chatsSlice';
import BlockIcon from '@mui/icons-material/Block';

const ActiveChatHeader = () => {

  const {currentChat: {username, profileImg}, isCurrentUserBlocked, isReceiverBlocked} = useSelector(state=>state.chats.data)
  const dispatch = useDispatch()

  const handleBlock = () =>{
    dispatch(toggleBlock())
  }

  const handleBack = () =>{
    dispatch(clearCurrentChat())
  }

  return (
    <div className="active-chat-header">
        <div className="active-chat-header-info">
            <ArrowBackIcon onClick={handleBack}/>
            <div>
              <img src={profileImg} alt={username} />
              <h2>{username}</h2>
            </div>
        </div>
        <div>
          <button 
            onClick={handleBlock}
            disabled={isCurrentUserBlocked}
          >
            <BlockIcon />
          </button>
        </div>
    </div>
  )
}

export default ActiveChatHeader