import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

const ActiveChatInput = () => {
  return (
    <div className="active-chat-input-container">
        <form>
            <div className="active-chat-input">
                <input type="text" name="text" id="text" placeholder='Type a message' />
                <label htmlFor="file">
                    <AttachFileIcon />
                </label>
                <input type="file" name="file" id="file" style={{display: 'none'}}/>
            </div>
            <input type="submit" value='Send'/>
        </form>
    </div>
  )
}

export default ActiveChatInput