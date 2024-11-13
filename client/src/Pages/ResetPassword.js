import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import Logo from "../asset/Image/logo.png"
import LoadingBtn from '../component/LoadingBtn'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function ResetPassword() {

    const [loading,setLoading]=useState(false)
    const {param1,param2}=useParams()
    const navigate=useNavigate()
    const [password,setPassword]=useState({newPassword:"",confirmPassword:""})
    const getCsrfToken = () => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || '';
    };



    console.log(param1);
    console.log(param2);

    const handleInput=(e)=>{
        setPassword(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    const resetPassword=async (e)=>{
        e.preventDefault()

        if(password?.newPassword===password?.confirmPassword){
            await axios.post(`${process.env.REACT_APP_URL}/api/change_password/${param1}/${param2}/`,{password:password.newPassword},{
                headers:{
                    'X-CSRFToken': getCsrfToken(),
                    Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
                }
            }).then(res=>{
                console.log(res);
                navigate("/")
            }).catch(err=>{
                toast.error(err.response.data["error"])
                console.log(err);
                
            })
        }else{
            toast("New password and Confirm password doesn't match")
        }
    }
    console.log("password",password);
    
    
  return (
    <div className="login-page">
      <ToastContainer/>
      
      <div className="login-left">
        <div className="tab-container">
          <div className="header-container">
            <div className="logo"><img src={Logo} alt='Logo' width="45px" /></div>
            <div className="app-name"><h2>Awash Wine IT Help Desk</h2></div>
          </div>
          <div className="login-container active-signin">
          <form className="login-form" onChange={handleInput} onSubmit={resetPassword}>
              <div className="login-header">
                <h1>Reset your password</h1>
              </div>
              
              <div className="form-ctrl">
                <label htmlFor="newpassword">New Password</label>
                <input type="password" name="newPassword" id="newpassword" />
              </div>
              <div className="form-ctrl">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmpassword" />
              </div>
              <div className="forgot-signin">
                {loading?<LoadingBtn/>:<button className="btn-login" >Reset</button>}
                
              </div>
            </form>
        </div>
        </div>
      </div>
      <div className="login-right"></div>

      
    </div>
  )
}

export default ResetPassword
