import React, { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate} from 'react-router-dom'
import SettingsNav from '../components/SettingsNav';
import UserSettings from '../components/UserSettings';
import AppSettings from '../components/AppSettings';

const Settings = () => {

  const navigate = useNavigate()
  const [currentSettings, setCurrentSettings] = useState(0)

  useEffect(()=>{
    document.title = 'ChatApp | Settings'
  }, [])

  return (
    <div className="settings-container">
        <div className="settings-header">
            <ArrowBackIcon onClick={()=>navigate('/')}/>
            <div>
                <h2>Settings</h2>
                <SettingsIcon/>                
            </div>
        </div>
        <div className="settings-content">
            <SettingsNav setCurrentSettings={setCurrentSettings} currentSettings={currentSettings}/>
            {
                currentSettings?<AppSettings/>:<UserSettings/>
            }
        </div>
    </div>
  )
}

export default Settings