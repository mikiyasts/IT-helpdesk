import React, { useState,useEffect, useContext } from 'react'
import Header from '../../component/Header'
import Table from '../../component/DataTable'
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import Pagination from '../../component/Pagination';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import LoadingBtn from '../../component/LoadingBtn';
function Dashboard() {

  const {isAuth,setIsAuth}=useContext(AuthContext)
  const [pendingavailable,setPendingAvailable]=useState(null)
  const [popup,setPopup]=useState(false);
  const [category,setCategory]=useState([])
  const [request,setRequest]=useState({
    title:"",
    description:"",
    category:0,
    attachments:""
  })
  const [mytickets,setMytickets]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [loading,setLoading]=useState(false)
const [recordsPerPage] = useState(9);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentRecords = mytickets.slice(indexOfFirstRecord, 
  indexOfLastRecord);
const nPages = Math.ceil(mytickets.length / recordsPerPage)

  const getDashdata=async ()=>{
    const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

     await axios.get(`${process.env.REACT_APP_URL}/api/list_ticket_category/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>setCategory(res.data)).catch(err=>console.log(err))



    await axios.get(`${process.env.REACT_APP_URL}/api/my_ticket/`,{
      headers:{
    Authorization: `Bearer ${acstoken}`,
      }
      }).then(res=>{
        console.log("mytickets",res.data);
        setMytickets(res.data)
        
      }).catch(err=>{
        console.log(err);
        
      })

    await axios.get(`${process.env.REACT_APP_URL}/api/check_pending_tickets/`,{
      headers:{
    Authorization: `Bearer ${acstoken}`,
      }
      }).then(res=>{
        console.log("mytickets",res.data);
        setPendingAvailable(res.data.has_pending_tickets)
      }).catch(err=>{
        console.log(err);
        
      })
  }
  useEffect( ()=>{
    getDashdata()
  },[])


  const setInput=(e)=>{
    setRequest(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.type!=="file"?e.target.value:e.target.files[0]
      }

    })
  }

  

const newRequest=async (e)=>{

  e.preventDefault()
  const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
        
  setLoading(true)
  await axios.post(`${process.env.REACT_APP_URL}/api/create_ticket/`,request,{headers:{
    "Content-Type": 'multipart/form-data',
    Authorization: `Bearer ${acstoken}`,
  }}).then(res=>{
    console.log(res)
    setLoading(false)

  }).catch(err=>{
    console.log(err)
    setLoading(false)
  })
}
 
  console.log(request);
  console.log("cont",isAuth);
  console.log(pendingavailable,"asdawdweassaf");
  
  const reqCard=category.map(el=>
  
    pendingavailable?<div className="card3" onClick={()=>{
    
    toast.warning("You have unclosed request")
  }}><div className="card-name" key={el.id}>{el.name}</div></div>
  :<div className="card3" onClick={()=>{
    setPopup(true)
    setRequest({
      title:el.name,
      category:el.id
    })
  }}><div className="card-name" key={el.id}>{el.name}</div></div>)

      const closeRequest=async (id)=>{

        const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
        setLoading(true)
        await axios.post(`${process.env.REACT_APP_URL}/api/close_ticket/${id}/`,request,{headers:{
          "Content-Type": 'multipart/form-data',
          Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
        }}).then(async res=>{
          await axios.post(`${process.env.REACT_APP_URL}/api/update_ticket_history/${id}/`,{new_value:"Closed",old_value:"Pending",field_updated:"status"},{
            headers:{
              Authorization: `Bearer ${acstoken}`,
            }
          }).then(res=>{
           console.log("history updated");
           window.location.reload()
           setLoading(false)
          }).catch(err=>{
            console.log(err)
           setLoading(false)
          })
          console.log(res)
        }).catch(err=>{
          console.log(err)
          setLoading(false)

        })
        getDashdata()
      }

  const tableRw=currentRecords && currentRecords.map(el=><tr>
    <td data-cell="ID">{el.id}</td>
    <td data-cell="Title">{el.title}</td>
    <td data-cell="Description">{el.description}</td>
    <td className="opt-dots" data-cell="Attachment" style={{display:'flex',justifyContent:"flex-start"}}>
    {el?.attachments.length<1?null:
    <a href={`${process.env.REACT_APP_URL}${el?.attachments[0]?.file}`} target='_blank' title='Preview'>< VisibilityIcon/></a>}
    </td>
    {
    el?.status==='Pending'?loading?<LoadingBtn/>:<td data-cell="Action"><button className="btn-login" onClick={()=>closeRequest(el.id)}>Close</button></td>:null
    }
  </tr>)


  return (
    <div className='user-dashboard_page'>
      <ToastContainer />
        <Header/>
        <div className="dashboard-main">
          <div className="dashboard-header" ><h2>New Request</h2></div>
          <div className="dashboard-cards">
            
            {reqCard}
          </div>


          <div className="dashboard-table">
          <div className="table-wrapper">
        <div className="card-table">
          <div
            className="card-header"
            style={{ padding: "1.5rem", borderBottom: ".5px solid #f2f2f225" }}
          >
            <h3>Recent Requests<sub style={{color:"#f2f2f2",fontWeight:"lighter",fontSize:"small"}}>{/*users.length*/}</sub></h3>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Attachment</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {tableRw}
              </tbody>
            </table>
            <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
          </div>
        </div>
        {/* popup*/}
      <div className={`popup ${popup &&"active"}`}>
        <div className="popup-pin" onClick={()=>{
    setPopup(false)
  }}></div>
       
        <div className="popup_header"><h2>Add New Request</h2></div>

        <form className="request-form" onSubmit={newRequest}>
          <div className="form-ctrl">
            <label htmlFor="req_name">Request Name <span>*</span></label>
            <input type="text" name="req_name" id="req-name" value={request.title} readOnly/>
          </div>
          
          <div className="form-ctrl">
            <label htmlFor="description">Description <span>*</span></label>
            <input type="text" name="description" id="description" value={request.description} onChange={setInput}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="atch">Attachment <span>*</span></label>
            <input type="file" name="attachments" id="atch" style={{width:"100%",display:"flex",alignItems:"center",paddingBlock:".3rem"}} onChange={setInput}/>
          </div>
          <div className="forgot-signin sigup-btn-conatiner">
                {
                loading? <LoadingBtn/> :<button className="btn-login">Submit</button>}
              </div>
        </form>
      </div>
      {/* popup*/}
    </div>
  )
}

export default Dashboard
