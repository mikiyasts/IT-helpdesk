import React from 'react'

function Tickets() {
  return (
    <div className='tickets-main'>
      <div className="tickets-header">
        filter and number of tickets
      </div>
      <div className="tickets-list">
        <ul>
          <li>this is test list</li>
          <li>this is test list</li>
          <li>this is test list</li>
          <li>this is test list</li>
          <li>this is test list</li>
          <li>this is test list</li>
          <li>this is test list</li>
          <li>this is test list</li>
        </ul>
      </div>
      <div className="tickets-preview">
        <div className="ticket-status">in progress</div>
        <div className="ticket-title">test title here</div>
        <div className="ticket-description">
          <h4>Description</h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto ut magnam nobis deleniti harum accusamus incidunt, laborum officia, explicabo placeat, possimus fuga libero alias.
        </div>
        <div className="ticket-note">
          <h4>Note</h4>
          note is temporary
        </div>
        <div className="ticket-solution">
            <h4>Solution</h4>
            <form>
              <textarea name="solution" id="solution" placeholder='Type here'>

              </textarea>
              <button>replace with component</button>
            </form>
        </div>
      </div>
      <div className="ticket-highlight">
        <div className="ticket-highligh-status">
          <h4>Status</h4>
          <p>inProgress</p>
        </div>
        <div className="ticket-highlight-requestor">
          <h5 className="requestor-name">Requestor Name</h5>
          <p className='highlight-lable'>Requestor</p>
          <p className='highlight-labele'>wanofi@awashwine.com</p>
        </div>
        <div className="ticket-highlight-datail">
          <div className="detail-header"><h4>Details</h4></div>
          <ul className="detail-list">
            <li>sample</li>
            <li>sample</li>
            <li>sample</li>
            <li>sample</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Tickets
