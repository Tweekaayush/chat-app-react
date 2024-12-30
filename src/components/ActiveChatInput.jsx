import React, { useCallback, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from 'react-redux'
import { sendMessages } from '../features/chatsSlice';

const ActiveChatInput = () => {

  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const {isCurrentUserBlocked, isReceiverBlocked} = useSelector(state=>state.chats.data)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSend = (e) =>{
    e.preventDefault()

    if(text === '') return;

    dispatch(sendMessages(text))

    setText("")
  }

  console.log(isCurrentUserBlocked, isReceiverBlocked)

  return (
    <div className="active-chat-input-container">
        {
          isCurrentUserBlocked ? (
            <p className='blocked-message'>
              You cannot reply to this conversation.
            </p>
          ): isReceiverBlocked?(
            <p className='blocked-message'>
              You have blocked this user.
            </p>
          ):(           
            <form onSubmit={handleSend}>
              <div className="active-chat-input">
                  <input type="text" name="text" id="text" placeholder='Type a message' value={text} onChange={handleChange}/>
                  <label htmlFor="file">
                      <AttachFileIcon />
                  </label>
                  <input type="file" name="file" id="file" style={{display: 'none'}}/>
              </div>
              <input type="submit" value='Send'/>
            </form>
        )
      }
    </div>
  )
}

export default ActiveChatInput