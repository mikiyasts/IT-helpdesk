import React, { useContext, useEffect, useState } from "react";
import Logo from "../asset/Image/logo.png"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LoadingBtn from "../component/LoadingBtn";

function Login() {
  const {isAuth,setIsAuth}=useContext(AuthContext)
  const {isAdmin,setIsAdmin}=useContext(AuthContext)
  const [tab, setTab] = useState("signin");
  const navigate=useNavigate()
  const [forgotPopup, setforgotPopup] = useState(false)
  const [loginform, Setloginform] = useState({ email: "", password: "" })
  const [Loading,setLoading]=useState(false)

  
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};


useEffect(()=>{
  
      document.cookie=`access_token=`
      document.cookie=`refresh_token=`
      sessionStorage.clear("isAuth")
      sessionStorage.clear("isAdmin")
},[])

  const submitLogin = (e) => {
    e.preventDefault()

    setLoading(true)

    axios.post("http://localhost:8000/api/token/",loginform,{ withCredentials: true ,headers: {
      'X-CSRFToken': getCsrfToken(),
      Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
  }})
    .then(res => {
      console.log("logged",res.data);
      
      document.cookie=`access_token=${res.data.access}`
      document.cookie=`refresh_token=${res.data.refresh}`
      setLoading(false)
      if(res.data?.user?.role==="admin"){
        setIsAdmin(true)
        sessionStorage.setItem("isAdmin",true) 
        console.log("ad");
        
        navigate("/admin")
      }else if(res.data?.user?.role==="employee"){
        setIsAuth(true)
        sessionStorage.setItem("isAuth",true) 
        console.log("emp");
        navigate("/dashboard")
      }
      // navigate("/dashboard")
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }
  const handleLoginchange = (e) => {
    Setloginform(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  console.log(loginform)

  return (
    <div className="login-page">
      {/* popup*/}
      <div className={`forgot-password_popup ${forgotPopup && "active"}`}>
        <div className="popup-pin" onClick={() => {
          setforgotPopup(false)
        }}></div>

        <div className="popup_header"><h2>Reset your Password</h2></div>

        <form className="reset-form">
          <div className="form-ctrl">
            <label htmlFor="reset-email">Email Address <span>*</span></label>
            <input type="email" name="email" id="reset-email" />
          </div>
          <div className="forgot-signin sigup-btn-conatiner">
            <button className="btn-login">Send Reset Link</button>
          </div>
        </form>
      </div>
      {/* popup*/}
      <div className="login-left">
        <div className="tab-container">
          <div className="header-container">
            <div className="logo"><img src={Logo} alt='Logo' width="45px" /></div>
            <div className="app-name"><h2>Awash Wine IT Help Desk</h2></div>
          </div>
          {/* signin container */}
          <div className={`login-container ${tab === "signin" && "active-signin"}`}>
            <form className="login-form" onSubmit={submitLogin} onChange={handleLoginchange}>
              <div className="login-header">
                <h1>Welcome Back !</h1>
              </div>
              <div className="form-ctrl">
                <label htmlFor="id">Email Address</label>
                <input type="text" name="email" id="id" />
              </div>
              <div className="form-ctrl">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
              </div>
              <div className="forgot-signin">
                <p onClick={() => {
                  setforgotPopup(true)
                }}>Forgot Password ?</p>
                {Loading?<LoadingBtn/>:<button className="btn-login" >Sign In</button>}
                
              </div>
            </form>
          </div>
          {/* signin container */}
        </div>
      </div>
      <div className="login-right"></div>


    </div>
  );
}

export default Login;
