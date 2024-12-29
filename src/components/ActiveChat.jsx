import React from 'react'
import ActiveChatHeader from './ActiveChatHeader'
import ActiveChatInput from './ActiveChatInput'

const ActiveChat = () => {
    const messages = [
        {
            id: 0,
            message: 'hfsadfsdafi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 1,
            message: 'faefjlsdjlkfjaf',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 0,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 1,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 0,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 1,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 0,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 1,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 0,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
        {
            id: 1,
            message: 'hi',
            img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
            time: 'just now',
        },
    ]
  return (
    <div className="active-chat-container">
        <ActiveChatHeader />
        <div className="active-chat-messages-container">
            {
                messages.map((message, i)=>{
                    return (<div key={i} className={`active-chat-message ${message.id===1?'owner':''}`}>
                        <div className='active-chat-message-img'>
                            <img src={message.img} alt="" />
                        </div>
                        <div className='active-chat-message-info'>
                            <p>{message.message}</p>
                            <p>{message.time}</p>
                        </div>
                    </div>)
                })
            }
        </div>
        <ActiveChatInput/>
    </div>
  )
}

export default ActiveChat