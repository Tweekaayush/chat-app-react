import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    
    const uid = null
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    useEffect(()=>{
        if(uid){
            navigate('/')
        }
    }, [])

  return (
    <div className="form-container">
        <h1>Welcome!</h1>
        <p>We are so excited to see you!</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                <h5>Email</h5>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>
                <span className="error-message"></span>
            </label>
            <label htmlFor="password">
                <h5>Password</h5>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
                <span className="error-message"></span>
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