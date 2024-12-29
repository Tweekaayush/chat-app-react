import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chats from './pages/Chats'
import PrivateRoute from './components/PrivateRoute'
import { onAuthStateChanged, auth } from './config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from './features/userSlice'


const App = () => {

  const dispatch = useDispatch()
  const {uid} = useSelector(state => state.user.data)

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        dispatch(getUserDetails({
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          profileImg: user.photoURL
        }))
      }
    }, [uid])
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route element={<PrivateRoute/>}>
          <Route exact path='/' element={<Chats/>}/> 
        </Route>
      </Routes>
    </Router>
  ) 
}

export default App