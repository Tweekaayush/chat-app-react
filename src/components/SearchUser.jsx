import React from 'react'

const SearchUser = ({setAddUserStatus, search, setSearch}) => {

  return (
    <div className="search-user-container">
        <div>
            <input type="text" placeholder='Search Chat List..' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div className="add-user-btn" onClick={()=>setAddUserStatus(true)}>
            <span>+</span>
        </div>
    </div>
  )
}

export default SearchUser