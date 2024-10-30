import React, { useState,useEffect, useContext } from 'react'
import Header from '../../component/Header'
import Table from '../../component/DataTable'
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
function Dashboard() {

  const {isAuth,setIsAuth}=useContext(AuthContext)
  
  const [popup,setPopup]=useState(false);
  const [category,setCategory]=useState([])
  const [request,setRequest]=useState({
    title:"",
    description:"",
    category:0
  })

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_URL}/api/list_ticket_category/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>setCategory(res.data)).catch(err=>console.log(err))
  },[])
  const setInput=(e)=>{
    setRequest(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.type!=="file"?e.target.value:e.target.files[0]
      }

    })
  }

const newRequest=(e)=>{
  e.preventDefault()
  axios.post(`${process.env.REACT_APP_URL}/api/create_ticket/`,request,{headers:{
    Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
  }}).then(res=>console.log(res)).catch(err=>console.log(err))
}
 
  console.log(request);
  console.log("cont",isAuth);

  const reqCard=category.map(el=><div className="card3" onClick={()=>{
    setPopup(true)
    setRequest({
      title:el.name,
      category:el.id
    })
  }}><div className="card-name">{el.name}</div></div>)


  return (
    <div className='user-dashboard_page'>
        <Header/>
        <div className="dashboard-main">
          <div className="dashboard-header" ><h2>New Request</h2></div>
          <div className="dashboard-cards">
            
            {reqCard}
          </div>
          <div className="dashboard-table">
            {/* <Table/> */}
          </div>
        </div>
        {/* popup*/}
      <div className={`popup ${popup &&"active"}`}>
        <div className="popup-pin" onClick={()=>{
    setPopup(false)
  }}></div>
       
        <div className="popup_header"><h2>Add New Request</h2></div>

        <form className="request-form" enctype="multipart/form-data" onSubmit={newRequest}>
          <div className="form-ctrl">
            <label htmlFor="req_name">Request Name <span>*</span></label>
            <input type="text" name="req_name" id="req-name" value={request.title} readOnly/>
          </div>
          {/* <div className="form-ctrl">
            <label htmlFor="location">Location <span>*</span></label>
            <select name="location" id="location" onChange={setInput}>
              <option value="">Select Your Location</option>
              <option value="Farm">Farm</option>
              <option value="Kality">Kality</option>
              <option value="Lideta">Lideta</option>
              <option value="Mekanissa">Mekanissa</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label htmlFor="dept">Department <span>*</span></label>
            <select name="dept" id="dept" onChange={setInput}>
              <option value="">Select Your Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finanace</option>
              <option value="Procurment">Procurement</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div> */}
          {/* <div className="form-ctrl">
            <label htmlFor="name">Name <span>*</span></label>
            <input type="text" name="name" id="name" value={request.name} onChange={setInput}/>
          </div> */}
          <div className="form-ctrl">
            <label htmlFor="description">Description <span>*</span></label>
            <input type="text" name="description" id="description" value={request.description} onChange={setInput}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="atch">Attachment <span>*</span></label>
            <input type="file" name="attachment" id="atch" style={{width:"100%",display:"flex",alignItems:"center",paddingBlock:".3rem"}} onChange={setInput}/>
          </div>
          <div className="forgot-signin sigup-btn-conatiner">
                <button className="btn-login">Submit</button>
              </div>
        </form>
      </div>
      {/* popup*/}
    </div>
  )
}

export default Dashboard
