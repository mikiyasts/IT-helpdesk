import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

function ProtectedRoutes() {

  const {isAuth,setIsAuth}=useContext(AuthContext)

  
    
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
  };




  useEffect(()=>{

    const reftoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))
        ?.split('=')[1];
    const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    const authUser=async ()=>{

      await axios.post(`${process.env.REACT_APP_URL}/api/token/refresh/`,{refresh:reftoken},{headers:{
        'X-CSRFToken': getCsrfToken(),
        "Authorization":`Bearer ${acstoken}`
      }}).then(res=>{
        setIsAuth(true)
        document.cookie=`access_token=${res.data.access}`
        document.cookie=`refresh_token=${res.data.refresh}`
        // setisLoading(false)
        console.log("hellow ac",res.data.access);
        console.log("hellow ref",res.data.refresh);
        
        return
      }).catch(err=>{
        setIsAuth(false)
        console.log("hellow?");

        // setisLoading(false)
        return
      })
    }

    authUser()
  },[])


  console.log("assssdad",isAuth);

  return  isAuth?<Outlet/>:<Navigate to="/"/>
}

export default ProtectedRoutes
