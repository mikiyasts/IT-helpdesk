import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CachedIcon from '@mui/icons-material/Cached';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CheckIcon from '@mui/icons-material/Check';
function Tickets() {
  return (
    <div className='tickets-main'>
      {/* <div className="tickets-header">
        filter and number of tickets
      </div> */}
      <div className="tickets-list">
        <div className="sort-refresh"><p>Sort <ExpandMoreIcon sx={{ fontSize: 20 }} /></p> <div><CachedIcon sx={{ fontSize: 20 }} /></div></div>
        <ul>
          <li>
            <div className="list-requestor-name">
              <p>Wanofi Israel</p>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda dignissimos, voluptates nisi dolorum ad qui repellendus atque quidem,
              dolores omnis modi aut nostrum obcaecati eius?</p>
            <div className="ticketid-status"><div className="id">12093923</div> <div className="status">in progress</div></div>
          </li>
          <li>
            <div className="list-requestor-name">
              <p>Wanofi Israel</p>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda dignissimos, voluptates nisi dolorum ad qui repellendus atque quidem,
              dolores omnis modi aut nostrum obcaecati eius?</p>
            <div className="ticketid-status"><div className="id">12093923</div> <div className="status">in progress</div></div>
          </li>
          <li>
            <div className="list-requestor-name">
              <p>Wanofi Israel</p>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda dignissimos, voluptates nisi dolorum ad qui repellendus atque quidem,
              dolores omnis modi aut nostrum obcaecati eius?</p>
            <div className="ticketid-status"><div className="id">12093923</div> <div className="status">in progress</div></div>
          </li>


        </ul>
      </div>
      <div className="tickets-preview">
        <div className="ticket-status">in progress</div>
        <div className="ticket-title"><h2>test title here</h2></div>
        <div className="ticket-description">
          <h4>Description</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto ut magnam nobis deleniti harum accusamus incidunt, laborum officia, explicabo placeat, possimus fuga libero alias.
          </p>

        </div>
        <div className="ticket-note">
          <h4>Note</h4>
          <p>note is temporary</p>
        </div>
        <div className="ticket-solution">
          <h4>Solution</h4>
          <form>
            <textarea name="solution" id="solution" placeholder='Type here' resize={false}>

            </textarea>
            <button className="btn-solved">Submit</button>
          </form>
        </div>
      </div>
      <div className="ticket-highlight">
        <div className="flx-row">
          <div><CheckIcon sx={{fontSize:35, backgroundColor:"#8370ff67"}} /></div>
          <div className="ticket-highligh-status">
            <h4>Status</h4>
            <p>inProgress</p>
          </div>
        </div>
        <div className="flx-row">
          <div>
          <AccountCircleRoundedIcon sx={{fontSize:35}}/>
        </div>
          <div className="ticket-highlight-requestor">
            <h5 className="requestor-name">Requestor Wanofi Israel</h5>
            <p className='highlight-lable'>Requestor</p>
            <p className='highlight-labele'>wanofi@awashwine.com</p>
          </div>
        </div>
        <div className="ticket-highlight-datail">
          <div className="detail-header"><h4>Details</h4> </div>
          <ul className="detail-list">
            <li><div className="detail-name">Request Time</div> <div className="detail-value">12/9/2024</div></li>
            <li><div className="detail-name">Location</div> <div className="detail-value">Lideta</div></li>
            <li><div className="detail-name">Title</div> <div className="detail-value"><p>Title is here</p></div></li>
            <li><div className="detail-name">Note</div> <div className="detail-value"><p>Note</p></div></li>
           
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Tickets
