import React from 'react'

const SettingsNav = ({currentSettings, setCurrentSettings}) => {

    const handleClick = (e) =>{
        setCurrentSettings(e)
    }

  return (
    <div className="settings-nav-container">
        <ul className="settings-nav-links">
            <li className={`${currentSettings?'':'settings-active'}`} onClick={()=>handleClick(0)}>
                User settings
            </li>
            <li className={`${currentSettings?'settings-active':''}`} onClick={()=>handleClick(1)}>
                App settings
            </li>
        </ul>
        <button>Logout</button>
    </div>
  )
}

export default SettingsNav