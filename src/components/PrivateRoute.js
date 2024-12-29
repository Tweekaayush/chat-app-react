import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const uid = 1
  return (
    uid? <Outlet/> : <Navigate to={'/login'}/>
  )
}

export default PrivateRoute