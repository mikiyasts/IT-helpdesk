import React, { useState,useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CachedIcon from '@mui/icons-material/Cached';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

function Tickets() {

  const [detailcollapse,setDetailcollapse]=useState(false)
  const [ticketList,setTicketList]=useState([])
  const [activeTicket,setActiveTicket]=useState(0)
  const [activePreview,setActivePreview]=useState(null)
  const [category,setCategory]=useState([])
  const [ticketHistory,setTicketHistory]=useState([])
  const [filter,setFilter]=useState({
    category:"",
    location:"",
    status:""
  })
  let preview
  


  useEffect( ()=>{
    // const reftoken = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('refresh_token='))
    //     ?.split('=')[1];
    const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
        const getTickets=async ()=>{
          await axios.get(`${process.env.REACT_APP_URL}/api/list_ticket/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>{
      setTicketList(res.data.reverse())
      
    }).catch(err=>console.log(err)
    )
    
        }
    getTickets()

  },[])

  useEffect(()=>{
    const getcategory=async ()=>{
      await axios.get(`${process.env.REACT_APP_URL}/api/list_ticket_category/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>setCategory(res.data)).catch(err=>console.log(err))
    }
    getcategory()
  },[])
  // useEffect(()=>{
  //   if(Number(activeTicket)>0){
  //     preview=ticketList.find(fi=>fi.id===Number(activeTicket))
  //     setActivePreview(preview)
  //   }
  // },[])
  const getTicketHistory=async (id)=>{
    await axios.get(`${process.env.REACT_APP_URL}/api/list_ticket_history/${id}/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>{
      setTicketHistory(res.data)
     
      
    }).catch(err=>console.log(err)
    )
  }
  console.log(ticketHistory,"history");
  
  const refreshTicket= async ()=>{
    
    await axios.get(`${process.env.REACT_APP_URL}/api/list_ticket/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>{
      setTicketList(res.data.reverse())
     
      
    }).catch(err=>console.log(err)
    )
  }


  const list=ticketList.filter(fl=>filter.category?fl.category===Number(filter.category):fl).filter(fl=>filter.status?fl.status.toLowerCase().includes(filter.status.toLocaleLowerCase()):fl).filter(fl=>{
    if(filter.location){
      if(fl.created_by){
        if(fl.created_by.branch){
          return fl.created_by.branch.toLocaleLowerCase().includes(filter.location.toLocaleLowerCase())
        }else{
          return fl
        }
      }
    }else{
      return fl
    }
  }).map(el=>{
    
    return (<li className={el.id===Number(activeTicket)?"active":null} key={el && el.id} onClick={()=>{
      setActiveTicket(el && el.id)
      // localStorage.setItem("activeticket",el.id)
      preview=ticketList.find(fi=>fi.id===el.id)
      setActivePreview(preview)
      getTicketHistory(el.id)
    }}>
            <div className="list-requestor-name">
            <p>{ el && el.created_by && el.created_by.username}</p>
            </div>
            <p>{el && el.description}</p>
    <div className="ticketid-status"><div className="id">{el && el.id}</div> <div className="status">{el &&el.status}</div></div>
  </li>)
  })

  const catoption=category.map(el=><option key={el.id} value={el.id}>{el.name}</option>)

  const FilterTicket=(e)=>{
    setFilter(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }
  let activeDate
  let activeTime
  const activeTicketdate=()=>{
    activeDate=activePreview?.created_at.split("T")[0]    
    activeTime=activePreview?.created_at.split("T")[1].split(":")    
  }

  activeTicketdate()

  console.log(activePreview);
  
  return (
    <>
    <div className="filter-div">
      <form onChange={FilterTicket}>
        <select name="category" id="category">
            <option value="">Category</option>
            {catoption}
         </select>
        <select name="status" id="status">
            <option value="">Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="in progress">IN-Progress</option>
         </select>
        <select name="location" id="location">
            <option value="">Location</option>
            <option value="lideta">Lideta</option>
            <option value="mekanissa">Mekanissa</option>
         </select>
      </form>
    </div>
    <div className='tickets-main'>
      {/* <div className="tickets-header">
        filter and number of tickets
      </div> */}
      <div className="tickets-list">
        <div className="sort-refresh"><p>Sort <ExpandMoreIcon sx={{ fontSize: 20 }} /></p> <div onClick={refreshTicket}><CachedIcon sx={{ fontSize: 20 }} className='refresh-icon' id="refresh-icon" /></div></div>
        <ul>
         {list ? list :<h2>Nothing to show</h2>}
        </ul>
      </div>
      { activePreview?<div className="tickets-preview">
         <div className="ticket-status">{activePreview && activePreview.status}</div>
        <div className="ticket-title"><h2>{activePreview && activePreview.title}</h2></div>
        <div className="ticket-description">
          <h4>Description</h4>
          <p>
          {activePreview && activePreview.description}
          </p>

        </div>
        {activePreview.status==='Closed' &&
        <div className="ticket-note">
          <h4>Solution</h4>
          <p>note is temporary</p>
        </div>
        }
        {activePreview.status==='Open' &&
        <div className="ticket-solution">
          <form>
            <button className="btn-solved">Accept Request</button>
          </form>
        </div>
        }
        {activePreview.status==='Pending' &&
        <div className="ticket-solution">
          <h4>Solution</h4>
          <form>
            <textarea name="solution" id="solution" placeholder='Type here'>

            </textarea>
            <button className="btn-solved">Submit</button>
          </form>
        </div>
        }
        
      </div>:<div className="tickets-preview"></div>}



      {activePreview?<div className="ticket-highlight">
        <div className="flx-row">
          <div><CheckIcon sx={{fontSize:35, backgroundColor:"#8370ff67"}} /></div>
          <div className="ticket-highligh-status">
            <h4>Status</h4>
            <p>{activePreview && activePreview.status}</p>
          </div>
        </div>
        <div className="flx-row">
          <div>
          <AccountCircleRoundedIcon sx={{fontSize:35}}/>
        </div>
          <div className="ticket-highlight-requestor">
            <h5 className="requestor-name">{activePreview && activePreview.created_by && activePreview.created_by.username}</h5>
            <p className='highlight-lable'>Requestor</p>
            <p className='highlight-lable'>{activePreview && activePreview.created_by && activePreview.created_by.email}</p>
          </div>
        </div>
        <div className="ticket-highlight-datail">
          <div className="detail-header" onClick={()=>setDetailcollapse(prev=>!prev)}>
            <h4>Details</h4> 
           { detailcollapse? <ExpandLessIcon/>: <ExpandMoreIcon sx={{ fontSize: 20 }}/>}
          <ul className={`detail-list ${detailcollapse&&"active"}`}>
          <li><div className="detail-name">Request Date</div> <div className="detail-value">{activeDate}</div></li>
          <li><div className="detail-name">Request Time</div> <div className="detail-value">{activeTime[0]}:{activeTime[1]}</div></li>
            <li><div className="detail-name">Location</div> <div className="detail-value">{activePreview && activePreview.created_by && activePreview.created_by.branch}</div></li>
            <li><div className="detail-name">Title</div> <div className="detail-value"><p>{activePreview && activePreview.title}</p></div></li>
            <li><div className="detail-name">Note</div> <div className="detail-value"><p>Note</p></div></li>
           
          </ul>
          
          </div>
          
        </div>
      </div>:<div  className="ticket-highlight"></div>}
      
    </div>
    </>
  )
}

export default Tickets
