import React, { useEffect, useState, useRef, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from 'react-redux'
import { getUsers, clearUsers, addUser } from '../features/chatsSlice';


const AddUser = ({addUserStatus, setAddUserStatus}) => {

    const [userInput, setUserInput] = useState('')
    const dispatch = useDispatch()
    const {users: userList} = useSelector(state=>state.chats.data)

    const searchUsers = useCallback(() =>{
        if(!userInput){
            dispatch(clearUsers())
        }else  dispatch(getUsers(userInput.trim()))
    }, [userInput])

    const handleAdd = (uid) =>{
        dispatch(addUser(uid))
        setAddUserStatus(false)
        setUserInput('')
    }

    useEffect(()=>{

        const timeout = setTimeout(searchUsers, 1000)
        
        return ()=> clearTimeout(timeout)

    }, [searchUsers])

  return (
    <div className="pg-overlay" style={{display: `${addUserStatus?'flex':'none'}`}}>
        <div className="add-user-container">
            <div className="quit-btn-container">
                <CloseIcon onClick={()=>[setAddUserStatus(false), setUserInput('')]}/>
            </div>
            <div className="add-user-input">
                <input type="text" value={userInput} onChange={(e)=>setUserInput(e.target.value)} placeholder='Search users to add..'/>
                {userInput && <CloseIcon onClick={()=>setUserInput('')}/>}
            </div>
            <div className="add-user-search-results">
                {
                    userList.length?(
                        userList.map((user)=>{
                            return <div className='add-user-item' key={user.uid}>
                                        <div className="add-user-item-left">
                                            <img src={user.profileImg} alt={user.username} />
                                            <h2>{user.username}</h2>
                                        </div>
                                        <div className="add-user-item-right">
                                            <button onClick={()=>handleAdd(user.uid)}>Add</button>
                                        </div>
                                    </div>
                        })
                    ):(
                        <p>No Users Found!</p>
                    )   
                }
            </div>
        </div>
    </div>
  )
}

export default AddUser