import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, createUserWithEmailAndPassword, updateProfile } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../features/userSlice'

const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  })

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  })

  const dispatch = useDispatch()
  const {uid} = useSelector(state=>state.user.data)
  const navigate= useNavigate()

  const validateForm = () =>{
    
    let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

    const obj = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    }
    
    if(formData.name.trim() === ''){
        obj.name = 'Please enter your First Name.'
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
    if(formData.password.trim() !== formData.confirmPassword.trim()){
        obj.confirmPassword = 'Passwords do not match'
    }

    setFormErrors({...obj})

    return obj.name === '' && obj.email === '' && obj.password === '' && obj.confirmPassword === ''
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
      createUserWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
        const user = userCredential.user
        updateProfile(user, {
          displayName: formData.name,
          photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png'
        });
        dispatch(getUserDetails({
            uid: user.uid,
            username: formData.name,
            email: user.email,
            profileImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png'
        }))
      }).catch(e=>console.log(e))
    }
  }

  useEffect(()=>{
    if(uid)
      navigate('/')
  }, [uid])

  return (
    <div className="form-container">
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                <h5>Email</h5>
                <input type="email" name="email" id="email" onChange={handleChange} value={formData.email}/>
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </label>
            <label htmlFor="name">
                <h5>Name</h5>
                <input type="text" name="name" id="name" onChange={handleChange} value={formData.name}/>
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </label>
            <label htmlFor="password">
                <h5>Password</h5>
                <input type="password" name="password" id="password" onChange={handleChange} value={formData.password}/>
                {formErrors.password && <span className="error-message">{formErrors.password}</span>}
            </label>
            <label htmlFor="confirmPassword">
              <h5>Confirm Password</h5>
              <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
            </label>
            <input type="submit" value="Register"/>
        </form>
        <p>
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
    </div>
  )
}

export default Register