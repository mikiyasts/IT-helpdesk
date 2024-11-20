import React, { useEffect, useState } from 'react'
import Logo from "../asset/Image/logo.png"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios';
import DraftsIcon from '@mui/icons-material/Drafts';
function Header() {
  const [notifications,setNotifications]=useState([])
  const navigate=useNavigate()
  const [logout,setLogout]=useState(false)
  const [notificationToggle,setNotificationToggle]=useState(false)



  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};
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
        'X-CSRFToken': getCsrfToken(),
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

  console.log(notifications);
  const markasRead=async (id)=>{
    const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    await axios.post(`${process.env.REACT_APP_URL}/api/notifications/${id}/mark-as-read/`,null,{
      headers:{
          'X-CSRFToken': getCsrfToken(),
          Authorization:`Bearer ${acstoken}`
      }
    }).then(res=>{
      console.log(res)
      getNotification()
    }).catch(err=>console.log(err))

    console.log(id);
    
  }
  const notificationList=notifications.map(el=>{
    const requestor=el.message.split(" ")
    console.log(requestor.length);
    
    return(
      <li>
        <div className='notification_header'><h4>{requestor[requestor.length-1]} </h4> <div title="mark as read" onClick={()=>markasRead(el.id)}><DraftsIcon sx={{fontSize:20}} /></div></div>
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
        <QuestionAnswerRoundedIcon sx={{ width: 20 }}  onClick={()=>{
          setNotificationToggle(prev=>!prev)
          }} />
        <div className={`notification_list ${notificationToggle && "active"}`}>
          <div className="mark_all_asread"></div>
            <ul>
              {notificationList.length>0 ? notificationList : <h3 style={{textAlign:"center"}}>No Notifications</h3>}
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
