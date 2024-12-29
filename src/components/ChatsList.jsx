import React from 'react'
import {useSelector} from 'react-redux'

const ChatsList = () => {

    const {chats} = useSelector(state=>state.user.data)

  return (
    <div className="chat-list-container">
        {/* {
            chats?.length?(
                chats?.map((chat, i)=>{
                return <div key={i} className='chat-list-item'>
                            <img src={chat} alt="" />
                            <div>
                                <h2>Aayush Dobriyal</h2>
                                <p>last message</p>
                            </div>
                        </div>
                })
            ):(<></>)
        } */}
        <div className='chat-list-item'>
            <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
            <div>
                <h2>Aayush Dobriyal</h2>
                <p>last message</p>
            </div>
        </div>
        <div className='chat-list-item'>
            <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
            <div>
                <h2>Aayush Dobriyal</h2>
                <p>last message</p>
            </div>
        </div>
        <div className='chat-list-item'>
            <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
            <div>
                <h2>Aayush Dobriyal</h2>
                <p>last message</p>
            </div>
        </div>
        <div className='chat-list-item'>
            <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
            <div>
                <h2>Aayush Dobriyal</h2>
                <p>last message</p>
            </div>
        </div>
    </div>
  )
}

export default ChatsList