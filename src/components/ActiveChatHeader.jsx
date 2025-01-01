import React from 'react'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch} from 'react-redux'
import { clearCurrentChat, toggleBlock } from '../features/chatsSlice';
import BlockIcon from '@mui/icons-material/Block';

const ActiveChatHeader = () => {

  const {currentChat: {username, profileImg, status}, isCurrentUserBlocked, isReceiverBlocked} = useSelector(state=>state.chats.data)
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
            <ArrowBackIcon onClick={handleBack} />
            <div>
              <img src={profileImg} alt={username} className='profile-avatar'/>
              <div>
                <h2>{username}</h2>
                <p>{status}</p>
              </div>

            </div>
        </div>
        <div>
          <button 
            onClick={handleBlock}
            disabled={isCurrentUserBlocked}
            title='Block'
          >
            <BlockIcon />
          </button>
        </div>
    </div>
  )
}

export default ActiveChatHeader