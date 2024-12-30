import React from 'react'

const SearchUser = ({setAddUserStatus}) => {
  return (
    <div className="search-user-container">
        <div>
            <input type="text" placeholder='Search Chats'/>
        </div>
        <div className="add-user-btn" onClick={()=>setAddUserStatus(true)}>
            <span>+</span>
        </div>
    </div>
  )
}

export default SearchUser