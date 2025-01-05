import React from 'react'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch} from 'react-redux'
import { clearCurrentChat, toggleBlock } from '../features/chatsSlice';
import BlockIcon from '@mui/icons-material/Block';

const ActiveChatHeader = ({setChatInfo}) => {

  const {currentChat: {username, profileImg, status, groupName, groupImg}, isCurrentUserBlocked, currentChat} = useSelector(state=>state.chats.data)
  const dispatch = useDispatch()

  const handleBlock = () =>{
    dispatch(toggleBlock())
  }
  
  const handleBack = () =>{
    dispatch(clearCurrentChat())
  }

  return (
    <div className="active-chat-header">
      {
        currentChat?.admin === undefined?(
            <>
              <div className="active-chat-header-info">
                <ArrowBackIcon onClick={handleBack} />
                <div>
                  <img src={profileImg} alt={username} className='profile-avatar' onClick={()=>setChatInfo(true)}/>
                  <div onClick={()=>setChatInfo(true)}>
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
                  <img src={groupImg} alt={groupName} className='profile-avatar'onClick={()=>setChatInfo(true)}/>
                  <div onClick={()=>setChatInfo(true)}>
                    <h2>{groupName}</h2>
                    <p>Tap to see group info!</p>
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