import React from 'react'

const SearchUser = ({setAddUserStatus, search, setSearch}) => {

  return (
    <div className="search-user-container">
            <input type="text" placeholder='Search Chat List..' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </div>
  )
}

export default SearchUser