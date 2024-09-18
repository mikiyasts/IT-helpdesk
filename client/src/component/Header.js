import React from 'react'
import Logo from "../asset/Image/logo.png"
function Header() {
  return (
    <div className='header'>
      <div className="header-left">
      <div className="logo"><img src={Logo} alt='Logo' width="35px"/></div>
      <div className="app-name"><h2>Awash Wine IT Help Desk</h2></div>
      </div>
      <div className="header-right">
        <div className="notification">✉️</div> 
        <div className="user">👤 wanofi</div> 
      </div>
    </div>
  )
}

export default Header
