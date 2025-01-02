import React from 'react'
import { useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { clearCurrentChat } from '../features/chatsSlice'

const Header = () => {

    const {pathname} = useLocation()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(clearCurrentChat())
    }, [pathname])

  return (
    <header>
        <Link to={'/'}>
            ChatApp
        </Link>
    </header>
  )
}

export default Header