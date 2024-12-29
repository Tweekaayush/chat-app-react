import React from 'react'

const SearchUser = () => {
  return (
    <div className="search-user-container">
        <div>
            <input type="text" placeholder='Search Chats'/>
        </div>
        <div className="add-user-btn">
            <span>+</span>
        </div>
    </div>
  )
}

export default SearchUser