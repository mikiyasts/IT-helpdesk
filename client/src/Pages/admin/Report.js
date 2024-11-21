import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Report() {


    const [department,setDepartment]=useState([])


    const getDepartment=async ()=>{
      await axios.get(`${process.env.REACT_APP_URL}/api/departments`,{
            headers:{
              Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
            }
          }).then(res=>{
            setDepartment(res.data)
          }).catch(err=>{
            console.log("You are Not Authorized !!");
            
          })
    }
    useEffect(()=>{
        getDepartment()
    },[])

    const deptOpt=department?.map(el=><option value={el.id}>
        {el.name}
    </option>)
  return (
    <div className='report-page'>
      <div className="filters">
        <div className="form-ctrl">
            <label htmlFor="from">From</label>
            <input type="date" name="from" id="from" />
        </div>
        <div className="form-ctrl">
            <label htmlFor="to">To</label>
            <input type="date" name="to" id="to"/>
        </div>
        <div className="form-ctrl">
            <label htmlFor="branch">Branch</label>
            <select>
                <option value="">Select Branch</option>
                <option value="Lideta">Lideta</option>
                <option value="Mekanissa">Mekanissa</option>
                <option value="Farm">Farm</option>
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="department">Department</label>
            <select>
                <option value="">Select Department</option>
                {deptOpt}
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="status">Status</label>
            <select>
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
                <option value="Onprogress">Onprogress</option>
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="assigned_to">Assigned To</label>
            <select>
                <option value="">Select Holder</option>
                <option value="Lideta">Lideta</option>
                <option value="Mekanissa">Mekanissa</option>
                <option value="Kality">Kality</option>
            </select>
        </div>
      </div>
      <div className="table-wrapper" style={{width:"100%",padding:"0px",height:"63vh",overflow:"scroll"}}>
        <div className="card-table" style={{width:"100%"}}>
          {/* <div
            className="card-header"
            style={{ padding: "1.5rem", borderBottom: ".5px solid #f2f2f225" }}
          >
            <h3>All Users <sub style={{color:"#f2f2f2",fontWeight:"lighter",fontSize:"small"}}>{users.length}</sub></h3>

          </div> */}
          <div className="table">
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {/* {tableRw} */}
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>User name</td>
                  <td>Role</td>
                  <td>Branch</td>
                  <td>Department</td>
                  <td>last</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
