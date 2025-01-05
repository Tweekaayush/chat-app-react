import React from 'react'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch} from 'react-redux'
import { clearCurrentChat, toggleBlock } from '../features/chatsSlice';
import BlockIcon from '@mui/icons-material/Block';

const ActiveChatHeader = ({setOpen}) => {

  const {currentChat: {username, profileImg, status, groupName, groupImg, groupStatus}, isCurrentUserBlocked, currentChat} = useSelector(state=>state.chats.data)
  const dispatch = useDispatch()

  const handleBlock = () =>{
    dispatch(toggleBlock())
  }
  
  const handleBack = () =>{
    dispatch(clearCurrentChat())
    setOpen(true)
  }

  return (
    <div className="active-chat-header">
      {
        currentChat?.admin === undefined?(
            <>
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
              
            </>
          ):(
            <>
              <div className="active-chat-header-info">
                <ArrowBackIcon onClick={handleBack} />
                <div>
                  <img src={groupImg} alt={groupName} className='profile-avatar'/>
                  <div>
                    <h2>{groupName}</h2>
                    <p>{groupStatus}</p>
                  </div>

              </div>
              </div>
            </>
          )
      }
        
    </div>
  )
}

export default ActiveChatHeader