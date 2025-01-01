import React from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import { updateUser } from '../features/userSlice';

const UserSettings = () => {

    const {username, status} = useSelector(state=>state.user.data)
    const [formData, setFormData] = useState({
        name: username,
        status: status,
    })
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        dispatch(updateUser({
            username: formData.name,
            status: formData.status
        }))
    }

  return (
    <div className="user-setting-container">
        <div className="setting-content-header">
            <h2>
                Edit Profile
            </h2>
            <EditIcon/>
        </div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                <span>Username </span>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder='username'/>
            </label>
            <label htmlFor="status">
                <span>Status</span>
                <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} placeholder='20 or less words'/>
            </label>
            <input type="submit" value="Save Changes"/>
        </form>

    </div>
  )
}

export default UserSettings