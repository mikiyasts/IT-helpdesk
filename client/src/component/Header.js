import React, { useEffect, useState } from 'react'
import Logo from "../asset/Image/logo.png"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios';
function Header() {
  const [notifications,setNotifications]=useState([])
  const navigate=useNavigate()
  const [logout,setLogout]=useState(false)

  const activeLogout=()=>{
      setLogout(prev=>!prev)
  }


  const getNotification=async ()=>{
    const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    await axios.get(`${process.env.REACT_APP_URL}/api/notifications/`,{
      headers:{
        Authorization:`Bearer ${acstoken}`
      }
    }).then(res=>{
      console.log("notifications",res.data);
      setNotifications(res.data)
      
    }).catch(err=>{
      console.log(err);
      
    })
  }
  useEffect(()=>{
    getNotification()
  },[])

  const notificationList=notifications.map(el=>{
    const requestor=el.message.split(" ")
    console.log(requestor.length);
    
    return(
      <li>
        <h4>{requestor[requestor.length-1]}</h4>
        <h5>{el.notification_type}</h5>
        <p>{el.message}</p>
      </li>
    )
  })
  return (
    <div className='header'>
      <div className="header-left">
      <div className="logo"><img src={Logo} alt='Logo' width="35px"/></div>
      <div className="app-name"><h2>Awash Wine IT Help Desk</h2></div>
      </div>
      <div className="header-right">
        <div className={`notification ${notifications?.length>0?"active":null}`} aria-valuenow={notifications?.length}>
        <QuestionAnswerRoundedIcon sx={{ width: 20 }} />
        <div className="notification_list">
            <ul>
              {notificationList}
            </ul>
          </div>
          </div> 
        <div className="user" id="user" onClick={activeLogout}>
        <AccountCircleRoundedIcon /> <span>Wanofi</span>
          <div className={`logout ${logout && "active"}`} onClick={()=>{
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
