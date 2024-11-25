import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Report() {


    const [department,setDepartment]=useState([])
    const [reports,setReports]=useState({})
    const [category,setCategory]=useState([])
    const [statistics,setStatistics]=useState([])
    const [filter,setFilter]=useState({
      from:"",
      to:"",
      status:"",
      branch:"",
      department:"",
      assigned_to:"",
      category:""
    })


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
          await axios.get(`${process.env.REACT_APP_URL}/api/list_ticket_category/`,{
            headers:{
              Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
            }
          }).then(res=>setCategory(res.data)).catch(err=>console.log(err))
    }


    const getReport=async ()=>{
      await axios.get(`${process.env.REACT_APP_URL}/api/report/tickets?status=${filter?.status}&department=${filter?.department}&branch=${filter?.branch}&category=${filter?.category}&start_date=${filter?.from}&end_date=${filter?.to}`,{
        headers:{
          Authorization:`API_KEY ${process.env.REACT_APP_API_KEY}`
        }
      }).then(res=>{
        setReports(res.data)
        console.log("report",res);
      }
      ).catch(err=>{
        console.log(err);
        
      })
    }

    useEffect(()=>{
        getDepartment()
      },[])
      useEffect(()=>{
        getReport()
      },[filter])

    
    const catOpt=category?.map(el=><option key={el.id} value={el.name}>
        {el.name}
    </option>)
    const deptOpt=department?.map(el=><option key={el.id} value={el.name}>
        {el.name}
    </option>)


    let rwno=0
    const tw=reports?.report?.map(el=>{
      rwno++
    return <tr key={el.id}>
      <td>{rwno}</td>
      <td>{el?.created_by?.username}</td>
      <td>{el?.assigned_to?.username}</td>
      <td>{el?.title}</td>
      <td>{el?.description}</td>
      <td>{el?.status}</td>
    </tr>})

      const totalreq=reports?.statistics?.ticket_status_counts?.map((elrw,index)=><div className="statistics-rws" key={index}>
        <div className="name">{elrw?.status}</div>
        <div className="value">{elrw?.total}</div>
      </div>)
      const totaldeptreq=reports?.statistics?.department_counts?.map((elrw,index)=><div className="statistics-rws" key={index}>
        <div className="name">{elrw?.created_by__department__name}</div>
        <div className="value">{elrw?.total}</div>
      </div>)
      const totaldbratreq=reports?.statistics?.branch_counts?.map((elrw,index)=><div className="statistics-rws" key={index}>
        <div className="name">{elrw?.created_by__branch}</div>
        <div className="value">{elrw?.total}</div>
      </div>)
      const totalcattreq=reports?.statistics?.category_counts?.map((elrw,index)=><div className="statistics-rws" key={index}>
        <div className="name">{elrw?.category__name}</div>
        <div className="value">{elrw?.total}</div>
      </div>)
      
      const totalcaseholtreq=reports?.statistics?.case_holder_counts?.map((elrw,index)=>{
        let name
      if(elrw.assigned_to__===" "){
        name="Unkown"
        console.log("blablablaba");
        
      }else{
        name=elrw?.assigned_to__
      }
      console.log("naaaaaaaaaaaaa",name);
      
      return <div className="statistics-rws" key={index}>
                <div className="name">{name?name:"h"}</div>
                <div className="value">{elrw?.total}</div>
      </div>})


console.log("iuaydoiuasydad",reports);
console.log("filterrrrrrrrrrrrrrrrrrrrrr",filter);


const filterReport=(e)=>{
  setFilter(prev=>{
    return{
      ...prev,
      [e.target.name]:e.target.value
    }
  })
}
  return (
    <div className='report-page'>
      <form className="filters" onChange={filterReport}>
        <div className="form-ctrl">
            <label htmlFor="from">From</label>
            <input type="date" name="from" id="from" />
        </div>
        <div className="form-ctrl">
            <label htmlFor="to">To</label>
            <input type="date" name="to" id="to"/>
        </div>
        <div className="form-ctrl">
            <label htmlFor="category">Category</label>
            <select name="category" value={filter.category}>
                <option value="">Select Branch</option>
                {catOpt}
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="branch">Branch</label>
            <select name="branch" value={filter.branch}>
                <option value="">Select Branch</option>
                <option value="Lideta">Lideta</option>
                <option value="Mekanissa">Mekanissa</option>
                <option value="Farm">Farm</option>
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="department">Department</label>
            <select name="department" value={filter.department}>
                <option value="">Select Department</option>
                {deptOpt}
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="status">Status</label>
            <select name="status"  value={filter.status}>
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
                <option value="On Progress">On progress</option>
            </select>
        </div>
        <div className="form-ctrl">
            <label htmlFor="assigned_to">Assigned To</label>
            <select name="assigned_to" value={filter.assigned_to}>
                <option value="">Select Holder</option>
                <option value="Lideta">Lideta</option>
                <option value="Mekanissa">Mekanissa</option>
                <option value="Kality">Kality</option>
            </select>
        </div>
      </form>
      <div className="table-wrapper" style={{width:"100%",padding:"1rem 0",height:"63vh",overflow:"scroll",display:"flex",flexDirection:"column",gap:"1rem"}}>
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
                  <td>No</td>
                  <td>Requestor</td>
                  <td>Case Holder</td>
                  <td>Category</td>
                  <td>Description</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {/* {tableRw} */}
                {tw}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-table" style={{width:"100%"}}>
          {/* <div
            className="card-header"
            style={{ padding: "1.5rem", borderBottom: ".5px solid #f2f2f225" }}
          >
            <h3>All Users <sub style={{color:"#f2f2f2",fontWeight:"lighter",fontSize:"small"}}>{users.length}</sub></h3>


          </div> */}
          <div className="statistics">
            <h4>Statistics</h4>
            <div className="statistics-container">
              <div className="statistics-clmns">
                <div className="statistics-rws">Total Req</div>
                {totalreq}
              </div>
              <div className="statistics-clmns">
                <div className="statistics-rws">Total Department Req</div>
                {totaldeptreq}
              </div>
              <div className="statistics-clmns">
                <div className="statistics-rws">Category</div>
                {totalcattreq}
              </div>
              <div className="statistics-clmns">
                <div className="statistics-rws">Branch</div>
                {totaldbratreq}
              </div>
              <div className="statistics-clmns">
                <div className="statistics-rws">Case Holds</div>
                {totalcaseholtreq}
              </div>
              <div className="statistics-clmns">
                <div className="statistics-rws">Avg Times</div>
                <div className="statistics-rws">
                <div className="name">Avg Response Time</div>
                <div className="value">{reports?.statistics?.["avg_response_time"]}</div>
                </div>
                <div className="statistics-rws">
                <div className="name">Avg Fix Time</div>
                <div className="value">{reports?.statistics?.["avg_fixing_time"]}</div>
                </div>
                <div className="statistics-rws"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
