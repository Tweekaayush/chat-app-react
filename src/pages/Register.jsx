import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    DOB: '',
  })

  const handleChange = (e) =>{
    const {name, value} = e.target

    console.log(value)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
  }
  return (
    <div className="form-container">
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                <h5>Email</h5>
                <input type="email" name="email" id="email" onChange={handleChange} value={formData.email}/>
                <span className="error-message"></span>
            </label>
            <label htmlFor="name">
                <h5>Name</h5>
                <input type="text" name="name" id="name" onChange={handleChange} value={formData.name}/>
                <span className="error-message"></span>
            </label>
            <label htmlFor="password">
                <h5>Password</h5>
                <input type="password" name="password" id="password" onChange={handleChange} value={formData.password}/>
                <span className="error-message"></span>
            </label>
            <label htmlFor="DOB">
              <h5>Date of birth</h5>
              <input type="date" name="DOB" id="DOB" onChange={handleChange} value={formData.DOB}/>
              <span className="error-message"></span>
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