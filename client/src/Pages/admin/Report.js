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
            <input type="date" name="from" id="from" style={{color:"black"}}/>
        </div>
        <div className="form-ctrl">
            <label htmlFor="to">To</label>
            <input type="date" name="to" id="to" style={{color:"black"}}/>
        </div>
        <div className="form-ctrl">
            <label htmlFor="branch">Branch</label>
            <select style={{color:"black"}}>
                <option value="">Select Branch</option>
                <option value="Lideta">Lideta</option>
                <option value="Mekanissa">Mekanissa</option>
                <option value="Farm">Farm</option>
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="department">Department</label>
            <select style={{color:"black"}}>
                <option value="">Select Department</option>
                {deptOpt}
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="status">Status</label>
            <select style={{color:"black"}}>
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
                <option value="Onprogress">Onprogress</option>
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="assigned_to">Assigned To</label>
            <select style={{color:"black"}}>
                <option value="">Select Holder</option>
                <option value="Lideta">Lideta</option>
                <option value="Mekanissa">Mekanissa</option>
                <option value="Kality">Kality</option>
            </select>
        </div>
      </div>
    </div>
  )
}

export default Report
