import React,{useState,useEffect} from "react";
import axios from "axios";
import Logo from "../asset/Image/logo.png";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function Header(props) {

  const navigate=useNavigate()

  const [logout,setLogout]=useState(false)
  const [notifications,setNotifications]=useState([])

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
    <div className="header">
      <div className="header-left">
        <div className="header-humburger" onClick={() => props.togglesidebar()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
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
  );
}

export default Header;
