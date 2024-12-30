import React from 'react'
import {useSelector} from 'react-redux'

const UserInfo = () => {
    const {currentChat:{profileImg, username}} = useSelector(state=>state.chats.data)
  return (
    <div className="user-info-container">
        
        <img src={profileImg} alt={username} />
        <h2>{username}</h2>
    </div>
  )
}

export default UserInfo