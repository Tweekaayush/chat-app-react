import React, { useEffect, useState, useRef, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from 'react-redux'
import { getUsers, clearUsers, addUser } from '../features/chatsSlice';


const AddUser = ({addUserStatus, setAddUserStatus}) => {

    const [userInput, setUserInput] = useState('')
    const dispatch = useDispatch()
    const {users: userList, chatList} = useSelector(state=>state.chats.data)
    const {uid} = useSelector(state=>state.user.data)
    const [filteredUsers, setFilteredUsers] = useState([])
    const ref= useRef('')

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

    const handleClickOutside = (e) =>{
    
        if(ref.current && !ref.current.contains(e.target)){
            setAddUserStatus(false)
            setUserInput('')
        }
    }

    useEffect(()=>{

        const timeout = setTimeout(searchUsers, 1000)
        
        return ()=> clearTimeout(timeout)

    }, [searchUsers])

    useEffect(()=>{
        setFilteredUsers(userList.filter((user)=>user.uid !== uid).filter((user)=>{
            let flag = true
            chatList.forEach((chat) => {
                if(chat.receiverId === user.uid){
                    flag = false
                    return
                }
            })
            return flag
        }))
    }, [userList, uid, chatList])

    useEffect(()=>{
        window.addEventListener('click', handleClickOutside, true)

        return ()=> window.removeEventListener('click', handleClickOutside, true)
    }, [])

  return (
    <div className="add-overlay" style={{display: `${addUserStatus?'flex':'none'}`}}>
        <div className="add-user-container" ref={ref}>
            <div className="quit-btn-container">
                <CloseIcon onClick={()=>[setAddUserStatus(false), setUserInput('')]}/>
            </div>
            <h2>
                Find users to chat.
            </h2>
            <div className="add-user-input">
                <input type="text" value={userInput} onChange={(e)=>setUserInput(e.target.value)} placeholder='Search users to add..'/>
                {userInput && <CloseIcon onClick={()=>setUserInput('')}/>}
            </div>
            <div className="add-user-search-results">
                {
                    filteredUsers.length?(
                        filteredUsers.map((user)=>{
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
                        <p></p>
                    )   
                }
            </div>
        </div>
    </div>
  )
}

export default AddUser