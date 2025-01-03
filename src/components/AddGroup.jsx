import React, { useEffect, useState, useRef, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from 'react-redux'
import { getUsers, clearUsers, addGroupChat } from '../features/chatsSlice';


const AddGroup = ({addGroupStatus, setAddGroupStatus}) => {

    const [userInput, setUserInput] = useState('')
    const dispatch = useDispatch()
    const [members, setMembers] = useState([])
    const {users: userList} = useSelector(state=>state.chats.data)
    const {data: {uid}, data} = useSelector(state=>state.user)
    const [filteredUsers, setFilteredUsers] = useState([])
    const ref= useRef('')
    const [groupName, setGroupName] = useState('')

    const searchUsers = useCallback(() =>{
        if(!userInput){
            dispatch(clearUsers())
        }else  dispatch(getUsers(userInput.trim()))
    }, [userInput])

    const handleAdd = (e, member) =>{
        e.preventDefault()
        setFilteredUsers(filteredUsers.filter((user)=>{
            let flag = true
            members.forEach((chat) => {
                if(chat.uid === user.uid){
                    flag = false
                    return
                }
            })
            return flag
        }))
        setMembers(prev => [...prev, member])
        setUserInput('')
    }

    const createGroup = (e) =>{
        e.preventDefault()

        if(groupName.trim() === '' || members.length === 0) return
        
        const groupData = {
            groupName: groupName,
            groupImg: 'https://i.pinimg.com/736x/71/26/7e/71267e196665cb6a2e48310bcf87f2c7.jpg',
            members: [{...data}, ...members],
            admin: uid
        }

        dispatch(addGroupChat(groupData))

        setGroupName('')
        setMembers([])
        setAddGroupStatus(false)
    }

    const handleClickOutside = (e) =>{
    
        if(ref.current && !ref.current.contains(e.target)){
            setAddGroupStatus(false)
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
                members.forEach((chat) => {
                    if(chat.uid === user.uid){
                        flag = false
                        return
                    }
                })
                return flag
            }))
        }, [userList, members, uid])
    

    useEffect(()=>{
        window.addEventListener('click', handleClickOutside, true)

        return ()=> window.removeEventListener('click', handleClickOutside, true)
    }, [])

  return (
    <div className="add-overlay" style={{display: `${addGroupStatus?'flex':'none'}`}}>
        <div className="add-group-container" ref={ref}>
            <div className="quit-btn-container">
                <CloseIcon onClick={()=>[setAddGroupStatus(false), setUserInput('')]}/>
            </div>
            <h2>
                Create a Group Chat!
            </h2>
            <form className="create-group-form" onSubmit={createGroup}>
                <label htmlFor="groupName">Group Name</label>
                <div>
                    <img className='profile-avatar' src="https://i.pinimg.com/736x/71/26/7e/71267e196665cb6a2e48310bcf87f2c7.jpg" alt="" />
                    <div className='add-group-input'>
                        <input type="text" name="groupName" id="groupName" placeholder='Group Name' value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
                    </div>
                </div>
                <label htmlFor="members">Members</label>
                <div className="members">
                    {members.map((member)=>{
                        return <div>
                                    <h3>
                                        {member.username}
                                    </h3>
                                    <CloseIcon onClick={()=>setMembers(members.filter((m)=>m.uid !== member.uid))}/>
                                </div>
                    })}
                </div>
                <div className='add-group-input'>
                    <input type="text" value={userInput} onChange={(e)=>setUserInput(e.target.value)} placeholder='Search users to add..' id='members'/>
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
                                                <button onClick={(e)=>handleAdd(e, user)}>Add</button>
                                            </div>
                                        </div>
                            })
                        ):(
                            <p></p>
                        )   
                    }
                </div>
                <input type="submit" value="Create" />
            </form>
        </div>
    </div>
  )
}

export default AddGroup