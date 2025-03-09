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


function AdminDashboard() {

  // const [chartdata,setChartset]=useState([])
  const [dashdata,setDashdata]=useState({})


  useEffect( ()=>{
   
        const getdashData=async ()=>{
          await axios.get(`${process.env.REACT_APP_URL}/api/admin-dashboard/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>{
      setDashdata(res.data)
      // console.log("brr",res.data && res.data.branch_request);
      
    }).catch(err=>{
      // console.log("You are Not Authorized !!");
      
    })
        }
    getdashData()


  },[])
// console.log("dashjjjjs",dashdata);

  return (
      <div className="admin-dashboard">
        <div className="cards">
          <div className="card">
            <div className="card-header"><h3>Closed</h3></div>
            <div className="number">
                  <h1>{dashdata.ticket_status && dashdata.ticket_status.closed}</h1>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Pending</h3></div>
            <div className="number">
            <h1>{dashdata.ticket_status && dashdata.ticket_status.pending}</h1>

            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Open</h3></div>
            <div className="number">
            <h1>{dashdata.ticket_status && dashdata.ticket_status.open}</h1>

            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>On Progress</h3></div>
            <div className="number">
            <h1>{dashdata.ticket_status && dashdata.ticket_status.in_progress}</h1>

            </div>
          </div>
          <div className="card-chart">
            <div className="card-header" style={{padding:"1rem",borderBottom:".5px solid #f2f2f225"}}><h3>Monthly Requests</h3></div>
            <div className="charts">
              <BarChart
                dataset={dashdata.branch_requests}
              />
            </div>
          </div>
          <div className="card-chart">
            <div className="card-header" style={{padding:"1rem",borderBottom:".5px solid #f2f2f225"}}><h3>Issue Ratio</h3></div>
            <div className="charts pie">
              <PieChart
              dataset={dashdata.categories}
              />
            </div>
          </div>
          {/* <div className="card-table">
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
          </div> */}
        </div>
      </div>
  );
}

export default AdminDashboard;
