import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { auth, signInWithEmailAndPassword } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../features/userSlice'

const Login = () => {
    
    const {uid} = useSelector(state=>state.user.data)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateForm = () =>{

        let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
  
        const obj = {
            email: '',
            password: '',
        }
        
        if(formData.email.trim() === ''){
            obj.email = 'Please enter an email address'
        }
        if(!(emailRegex.test(formData.email.trim()))){
            obj.email = 'Please enter a valid email address.'
        }
        if(formData.password.trim().length < 6){
            obj.password = 'Your password must have more than 6 characters'
        }
  
        setFormErrors({...obj})
  
        return obj.email === '' && obj.password === ''
        
    }

    const handleChange = (e) =>{
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const validate = validateForm()
        if(validate){
            signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
                const user = userCredential.user
                dispatch(getUserDetails({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    profileImg: user.photoURL
                }))
            }).catch(e=>console.log(e))
        }
    }

    useEffect(()=>{
        if(uid){
            navigate('/')
        }
    }, [uid])

    useEffect(()=>{
        document.title = 'ChatApp | Login'
    }, [])

  return (
    <div className="form-container">
        <h1>Welcome!</h1>
        <p>We are so excited to see you!</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                <h5>Email</h5>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </label>
            <label htmlFor="password">
                <h5>Password</h5>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
                {formErrors.password && <span className="error-message">{formErrors.password}</span>}
            </label>
            <input type="submit" value="Log in"/>
        </form>
            <p>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
    </div>
  )
}

export default Login