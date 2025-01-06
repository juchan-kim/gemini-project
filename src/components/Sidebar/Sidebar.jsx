import React, { useContext } from 'react'
import './Sidebar.css'
import { assets } from "../../assets/assets"
import { useState } from 'react'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  
  const { prevPrompts } = useContext(Context)
  
  const prompts = prevPrompts.map(promp => {(
      <>
      <img src={assets.message_icon} alt="" />
      <p>{prompt}</p>
      </>
  )})

  return (
      <div className='sidebar' >
        <div className="top">
          <img className='menu' onClick={() => setExtended(prev => !prev)} src={assets.menu_icon} alt="" />
          {extended ? 
          <div className="new-chat">
            <img src={assets.plus_icon} alt="" />
            <p>New Chat</p>
          </div> :
          <div className="new-chat">
            <img src={assets.plus_icon} alt="" />
          </div>
          }
        {extended ?  
        <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompts.map(item => {
            return (
              <div className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item} ...</p>
              </div>
            )
          })}
        </div> :
        null
        }
        </div>
        <div className="bottom" >
        <div className="bottom-item recent-entry">
        <img src={assets.question_icon} alt="" />
        {extended ?
        <p>Help</p> :
        null  
        }
        </div>
        <div className="bottom-item recent-entry">
        <img src={assets.history_icon} alt="" />
        {extended ?
        <p>Activity</p> :
        null
        }
        </div>
        <div className="bottom-item recent-entry">
        <img src={assets.setting_icon} alt="" />
        {extended ?
        <p>Settings</p> :
        null
        }
        </div>
        </div>
      </div>
  )
}

export default Sidebar
