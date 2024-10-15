import React, { useState } from "react";
import Logo from "../asset/Image/logo.png"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios"
import { useNavigate } from "react-router-dom";
function Login() {
  const [tab, setTab] = useState("signin");
  const navigate=useNavigate()
  const [forgotPopup, setforgotPopup] = useState(false)
  const [loginform, Setloginform] = useState({ username: "", password: "" })
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};



  const submitLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/api/token/",loginform,{ withCredentials: true ,headers: {
      'X-CSRFToken': getCsrfToken(),
  }})
    .then(res => {
      console.log(res);
      document.cookie=`access_token=${res.data.access}`
      document.cookie=`refresh_token=${res.data.refresh}`

      if(res.data.role==="admin"){
        navigate("/admin")
      }else if(res.data.role==="employee"){
        navigate("/dashboard")
      }
      // navigate("/dashboard")
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    console.log(loginform);
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
                <input type="text" name="username" id="id" />
              </div>
              <div className="form-ctrl">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
              </div>
              <div className="forgot-signin">
                <p onClick={() => {
                  setforgotPopup(true)
                }}>Forgot Password ?</p>
                <button className="btn-login" >Sign In</button>
              </div>
            </form>
            <div className="signup">
              <p>
                Don't you have an account?
              </p> <span className="tab" onClick={() => {
                setTab("signup")
              }}> Sign Up</span>
            </div>
          </div>
          {/* signin container */}

          {/* signup container */}
          <div className={`signup-container ${tab === "signup" && "active-signup"}`}>
            <form className="login-form">
              <div className="login-header">
                <h1 className="create-account">Create you account</h1>
              </div>
              <div className="form-ctrl">
                <label htmlFor="id">Email Address</label>
                <input type="text" name="email" id="sid" />
              </div>
              <div className="form-ctrl">
                <label htmlFor="fullname">Full Name</label>
                <input type="fullname" name="fullname" id="fullname" />
              </div>
              <div className="form-ctrl">
                <label htmlFor="brach">Branch</label>
                <select name="branch" id="branch">
                  <option value="">Select Your Branch</option>
                  <option value="farm">Farm</option>
                  <option value="lideta">Lideta</option>
                  <option value="mekanissa">Mekanissa</option>
                </select>
              </div>
              <div className="form-ctrl">
                <label htmlFor="department">Department</label>
                <select name="department" id="department">
                  <option value="">Select Your Department</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="form-ctrl">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="spassword" />
              </div>
              <div className="forgot-signin sigup-btn-conatiner">
                <button className="btn-login">Sign Up</button>
              </div>
            </form>
            <div className="signup">
              <p>
                Have an account?
              </p><span className="tab" onClick={() => {
                setTab("signin")
              }}> Sign In</span>
            </div>
          </div>
          {/* signup container */}
        </div>
      </div>
      <div className="login-right"></div>

      {/* <div className="login-card">
  <div className="login-header"><h1>Login</h1></div>
  <form className="login-form">
      <div className="form-ctrl">
          <label htmlFor="id">ID</label>
          <input type="text" name="emp_id" id="id" placeholder='Enter Your Id Here'/>
      </div>
      <div className="form-ctrl">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" placeholder='Enter Your Password Here'/>
      </div>
      <div className="forgot-password">Forgot Password ?</div>
      <button className="btn-login">Login</button>
  </form>
</div> */}


    </div>
  );
}

export default Login;
