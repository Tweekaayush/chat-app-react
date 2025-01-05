import React from 'react'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {toggleBlock} from '../features/chatsSlice'
import { useDispatch } from 'react-redux';

const CurrentChatInfo = ({setChatInfo}) => {

    const {currentChat: {profileImg, username, groupName, groupImg, status, members, admin}, isCurrentUserBlocked, isReceiverBlocked, commonGroups} = useSelector(state=>state.chats.data)
    const {data} = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const handleBack = () =>{
        setChatInfo(false)
    }

  return (
    <div className="current-chat-info-container">
        <div className="current-chat-upper">
            <ArrowBackIcon onClick={handleBack} />
            {
                admin ? (
                    <div className="current-chat-upper-info">
                        <img src={groupImg} alt={groupName} />
                        <h1>{groupName}</h1>
                    </div>
                ):(
                    <div className="current-chat-upper-info">
                        <img src={profileImg} alt={username} />
                        <h1>{username}</h1>
                        <p>{status}</p>
                    </div>
                )
            }
        </div>
        {
            admin ? (
                <div className="current-chat-middle">
                    <h1>Members</h1>
                    <ul className="current-chat-list">
                        {
                            [data, ...members]?.map((member)=>{
                                return <li key={member.uid} className='member-list-item'>
                                            <img src={member.profileImg} alt={member.username} className='profile-avatar' />
                                            <div>
                                                <h2>{member.username}</h2>
                                                {admin === member.uid && <span>Admin</span>}
                                            </div>
                                        </li>
                            })
                        }
                    </ul>
                </div>
            ):(
                <div className="current-chat-middle">
                    <h1>You have {commonGroups.length} Groups in common.</h1>
                    { commonGroups?.length !== 0 &&
                        <ul className="current-chat-list">
                                {
                                    commonGroups?.map((group)=>{
                                        return <li key={group.chatId} className='member-list-item'>
                                                    <img src={group.groupImg} alt={group.groupName} className='profile-avatar' />
                                                    <div>
                                                        <h2>{group.groupName}</h2>
                                                    </div>
                                                </li>
                                    })
                                }
                        </ul>
                    }
                </div>
            )
        }
        <div className="current-chat-bottom">
            {
                admin?<></> :<button disabled={isCurrentUserBlocked} onClick={()=>dispatch(toggleBlock())} >
                    {isReceiverBlocked?'Blocked':'Block'}
                </button>
            }
        </div>
    </div>
  )
}

export default CurrentChatInfo