import React from 'react'

const ChatListHeader = () => {
  return (
    <div className="header-user-info">
        <div className="header-user">
            <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
            <h2>Aayush Dobriyal</h2>
        </div>
        <div className='more-details-dots'>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </div>
  )
}

export default ChatListHeader