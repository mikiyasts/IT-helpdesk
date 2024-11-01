import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import Cookies from 'js-cookie'
function ProtectedRoutes() {

  const {isAuth,setIsAuth}=useContext(AuthContext)
  const [isLoading,setisLoading]=useState(true)
  const navigate=useNavigate()
    
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
  };


 
  


  const authUser=async ()=>{
    if(isAuth){
      const reftoken = document.cookie
    .split('; ')
    .find(row => row.startsWith('refresh_token='))
    ?.split('=')[1];

    await axios.post(`${process.env.REACT_APP_URL}/api/token/refresh/`,{refresh:reftoken},{headers:{
      'X-CSRFToken': getCsrfToken(),
    }}).then(res=>{
      document.cookie=`access_token=${res.data.access}`
      document.cookie=`refresh_token=${res.data.refresh}`
      setisLoading(false)

      setIsAuth(true)
      
      // setisLoading(false)
      console.log("hellow ac",res.data.access);
      return console.log("hellow ref",res.data.refresh);
    }).catch(err=>{
      setisLoading(false)
      setIsAuth(false)
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      navigate("/")
      return console.log("hellow?");

      // setisLoading(false)
      
    })
    }else{
      navigate(-1)
    }
    
  }


  useEffect(()=>{

    

    
    authUser()

    const delay= 1000 * 60 * 4 
    const interval=setInterval(()=>{
      authUser()
    },delay)

    return ()=>clearInterval(interval)
  },[isLoading,isAuth])

  if(isLoading){
    return <h1>Loading</h1>
}else{

  return isAuth && isAuth? <Outlet/> : <Navigate to="/"/>
}
}

export default ProtectedRoutes
