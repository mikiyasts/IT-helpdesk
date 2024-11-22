import React, { useContext, useEffect, useState } from "react";
import Logo from "../asset/Image/logo.png"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LoadingBtn from "../component/LoadingBtn";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const {isAuth,setIsAuth}=useContext(AuthContext)
  const {isAdmin,setIsAdmin}=useContext(AuthContext)
  const {setUser}=useContext(AuthContext)
  const [tab, setTab] = useState("signin");
  const navigate=useNavigate()
  const [forgotPopup, setforgotPopup] = useState(false)
  const [loginform, Setloginform] = useState({ email: "", password: "" })
  const [Loading,setLoading]=useState(false)
  const [resetLoading,setResetLoading]=useState(false)
  const [email,setEmail]=useState("")
  
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};


useEffect(()=>{
  
      // Set cookies to expire
document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

// Clear session storage
sessionStorage.removeItem('isAuth');
sessionStorage.removeItem('isAdmin');
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
      localStorage.setItem("user",res?.data?.user?.username)
      setUser(res?.data?.user?.username)
      if(res.data?.user?.role==="admin"){
        setIsAdmin(true)
        sessionStorage.setItem("isAdmin",true) 
        console.log("adddddddddddddddd",res?.data?.user?.username);
        
        navigate("/admin/dashboard")
      }else if(res.data?.user?.role==="employee"){
        setIsAuth(true)
        sessionStorage.setItem("isAuth",true) 
        console.log("emp");
        navigate("/dashboard")
      }
      // navigate("/dashboard")
    }).catch(err => {
      setLoading(false)
      if(typeof(err?.response?.data)==="object"){
        console.log("in iffffffff");
        
        let errors=Object.keys(err?.response?.data)
        errors.forEach(error => {
        console.log("error",err?.response?.data[error][0]);
        if(error!=="non_field_errors"){
        return  toast.warning(`${error}: ${err?.response?.data[error][0]}`)
        }
        return toast.warning(`${err?.response?.data[error][0]}`)
      });
      }else{
        toast.warning(`Server Error Please Try Again Later`)
      }
      
      
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


  const forgotPassword=async (e)=>{

    e.preventDefault()
    setResetLoading(true)
    await axios.post(`${process.env.REACT_APP_URL}/api/password_reset/`,{email},{
      headers:{
        Authorization:`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then(res=>{
      setResetLoading(false)
      console.log(res);
      
    }).catch(err=>{
      setResetLoading(false)
      console.log(err);
      
    })
  }

  console.log(loginform)
console.log("emaiiiiiiiiiiiiiil",email);

  return (
    <div className="login-page">
      <ToastContainer/>
      {/* popup*/}
      <div className={`forgot-password_popup ${forgotPopup && "active"}`}>
        <div className="popup-pin" onClick={() => {
          setforgotPopup(false)
        }}></div>

        <div className="popup_header"><h2>Reset your Password</h2></div>

        <form className="reset-form" onSubmit={forgotPassword} onChange={(e)=>setEmail(e.target.value)}>
          <div className="form-ctrl">
            <label htmlFor="reset-email">Email Address <span>*</span></label>
            <input type="email" name="email" id="reset-email" />
          </div>
          <div className="forgot-signin sigup-btn-conatiner">
            {resetLoading?<LoadingBtn/>:<button className="btn-login">Send Reset Link</button>}
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
