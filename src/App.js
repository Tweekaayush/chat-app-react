import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chats from './pages/Chats'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
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