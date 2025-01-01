import React from 'react'
import { themes } from '../datalist'
import {useSelector, useDispatch} from 'react-redux'
import { changeTheme } from '../features/themeSlice'

const AppSettings = () => {

    const {theme} = useSelector(state=>state.theme)
    const dispatch = useDispatch()

  return (
    <div className="app-setting-container">
        <div className="setting-content-header">
            <h2>
                App Theme
            </h2>
        </div>
        <ul className="app-setting-grid">
            {
                themes.map((t)=>{
                    return <li key={t.id} className={theme===t.value?'active-theme':''} onClick={()=>dispatch(changeTheme(t.value))}>{t.value}</li>
                })
            }
        </ul>
    </div>
  )
}

export default AppSettings