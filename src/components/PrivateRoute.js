import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const {uid} = useSelector(state=>state.user.data)
  return (
    uid? <Outlet/> : <Navigate to={'/login'} replace={true}/>
  )
}

export default PrivateRoute