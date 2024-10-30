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
        Authorization: `bearer  ${acstoken}`,
      }
    }).then(res=>{
      setTicketList(res.data.reverse())
      console.log("brr",res.data && res.data.branch_request);
      
    }).catch(err=>console.log("errdash",err)
    )
        }
    getTickets()

  },[])
  // useEffect(()=>{
  //   if(Number(activeTicket)>0){
  //     preview=ticketList.find(fi=>fi.id===Number(activeTicket))
  //     setActivePreview(preview)
  //   }
  // },[])

  const refreshTicket= async ()=>{
    
    await axios.get(`${process.env.REACT_APP_URL}/api/list_ticket/`,{
      headers:{
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      }
    }).then(res=>{
      setTicketList(res.data.reverse())
      console.log("brr",res.data && res.data.branch_request);
      
    }).catch(err=>console.log("errdash",err)
    )
  }
console.log("act",activeTicket)
console.log(ticketList[0]);

  const list=ticketList.map(el=>{
    console.log("sdfs",typeof(el.id));
    console.log("sdfs",typeof(el.id));
    
    return (<li className={el.id===Number(activeTicket)?"active":null} key={el && el.id} onClick={()=>{
      setActiveTicket(el && el.id)
      // localStorage.setItem("activeticket",el.id)
      preview=ticketList.find(fi=>fi.id===el.id)
      setActivePreview(preview)
      console.log("gttg",preview);
      
    }}>
            <div className="list-requestor-name">
            <p>{ el && el.created_by && el.created_by.username}</p>
            </div>
            <p>{el && el.description}</p>
    <div className="ticketid-status"><div className="id">{el && el.id}</div> <div className="status">{el &&el.status}</div></div>
  </li>)
  })

  console.log("prev",preview)
  return (
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
        <div className="ticket-note">
          <h4>Note</h4>
          <p>note is temporary</p>
        </div>
        <div className="ticket-solution">
          <h4>Solution</h4>
          <form>
            <textarea name="solution" id="solution" placeholder='Type here'>

            </textarea>
            <button className="btn-solved">Submit</button>
          </form>
        </div>
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
            <li><div className="detail-name">Request Time</div> <div className="detail-value">{activePreview && activePreview.created_at}</div></li>
            <li><div className="detail-name">Location</div> <div className="detail-value">{activePreview && activePreview.created_by && activePreview.created_by.branch}</div></li>
            <li><div className="detail-name">Title</div> <div className="detail-value"><p>{activePreview && activePreview.title}</p></div></li>
            <li><div className="detail-name">Note</div> <div className="detail-value"><p>Note</p></div></li>
           
          </ul>
          
          </div>
          
        </div>
      </div>:<div  className="ticket-highlight"></div>}
      
    </div>
  )
}

export default Tickets
