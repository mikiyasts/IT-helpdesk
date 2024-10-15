import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
  return  true?<Outlet/>:<Navigate to="/"/>
}

export default ProtectedRoutes
