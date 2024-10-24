import React from 'react'
import Logo from "../asset/Image/logo.png"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function Header() {
  const navigate=useNavigate()
  return (
    <div className='header'>
      <div className="header-left">
      <div className="logo"><img src={Logo} alt='Logo' width="35px"/></div>
      <div className="app-name"><h2>Awash Wine IT Help Desk</h2></div>
      </div>
      <div className="header-right">
        <div className="notification">✉️</div> 
        <div className="user">
        <AccountCircleRoundedIcon /> <span>Wanofi</span>
          <div className="logout active" onClick={()=>{
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            navigate("/")
          }}>
            Logout
          </div>
          </div> 
      </div>
    </div>
  )
}

export default Header
