import React, { useEffect, useState } from "react";
import Logo from "../../asset/Image/logo.png";
import AdminHeader from "../../component/AdminHeader";
import { Outlet } from "react-router-dom";
import Dashboard from "../user/Dashboard";
import FillChart from "../../component/FillChart"
import LineChart from "../../component/LineChart"
import BarChart from "../../component/BarChart"
import PieChart from "../../component/PieChart"
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
const navigate=useNavigate()
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};

  useEffect(()=>{
    axios.get("http://localhost:8000/api/getuser/",{ withCredentials: true ,headers: {
      'X-CSRFToken': getCsrfToken(),
  }}).then(res=>{
    const role=res.data && res.data.role
      console.log("token",res);
      console.log("token",role);
      if(role!=="admin"){
        navigate("/")
      }
    }).catch(err=>{
      console.log("err",err);
      
    })
  })


  return (
      <div className="admin-dashboard">
        <div className="cards">
          <div className="card">
            <div className="card-header"><h3>Completed</h3></div>
            <div className="number">
                  <h1>30</h1>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Pending</h3></div>
            <div className="number">
              <h1>12</h1>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>On Progress</h3></div>
            <div className="number">
              <h1>10</h1>
            </div>
          </div>
          <div className="card-chart">
            <div className="card-header" style={{padding:"1rem",borderBottom:".5px solid #f2f2f225"}}><h3>Monthly Requests</h3></div>
            <div className="charts">
              <BarChart/>
            </div>
          </div>
          <div className="card-chart">
            <div className="card-header" style={{padding:"1rem",borderBottom:".5px solid #f2f2f225"}}><h3>Issue Ratio</h3></div>
            <div className="charts pie">
              <PieChart/>
            </div>
          </div>
          <div className="card-table">
            <div className="card-header" style={{padding:"1.5rem",borderBottom:".5px solid #f2f2f225"}}><h3>Recent Requests</h3></div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                  <td>Name</td>
                  <td>Req_id</td>
                  <td>Req_name</td>
                  <td>Location</td>
                  <td>Department</td>
                  <td>Req_date</td>  
                  </tr>
                  
                </thead>
                <tbody>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                <tr>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                  <td>sample</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AdminDashboard;
