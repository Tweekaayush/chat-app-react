import React, { lazy, useEffect, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { onAuthStateChanged, auth } from './config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './features/userSlice';
import Settings from './pages/Settings';
import Header from './components/Header';
const Login = lazy(()=>import('./pages/Login'));
const Register = lazy(()=>import('./pages/Register'));
const Chats = lazy(()=>import('./pages/Chats'));


const App = () => {

  const dispatch = useDispatch()
  const {uid} = useSelector(state => state.user.data)
  const {theme} = useSelector(state=>state.theme)

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

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Router>
      <div className="body-background">
        <div className="body-bg-shape"></div>
        <div className="body-bg-shape"></div>
      </div>
      <Header/>
      <div className="body-container">
        <Suspense fallback={<>loading...</>}>
          <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route element={<PrivateRoute/>}>
              <Route exact path='/' element={<Chats/>}/> 
              <Route exact path='/settings' element={<Settings/>}/> 
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  ) 
}

export default App