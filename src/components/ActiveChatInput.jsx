import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from 'react-redux'
import { sendGroupMessages, sendMessages } from '../features/chatsSlice';
import EmojiPicker from 'emoji-picker-react'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const ActiveChatInput = () => {

  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const {isCurrentUserBlocked, isReceiverBlocked, currentChat} = useSelector(state=>state.chats.data)
  const [open, setOpen] = useState(false)

  const handleEmoji = (e) =>{
    setText(prev => prev + e.emoji)
    setOpen(false)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSend = (e) =>{
    e.preventDefault()

    if(text === '') return;

    if(currentChat?.admin !== undefined) dispatch(sendGroupMessages(text))
    else dispatch(sendMessages(text))

    setText("")
  }

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
                  <div className='picker'>
                    <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    <SentimentSatisfiedAltIcon onClick={()=>setOpen(prev=>!prev)}/>
                  </div>
                  <input type="file" name="file" id="file" style={{display: 'none'}}/>
              </div>
              <label>
                <input type="submit" value='Send' style={{display: 'none'}}/>
                <div>
                  <SendIcon />
                </div>
              </label>
            </form>
        )
      }
    </div>
  )
}

export default ActiveChatInput