import React, { useState } from 'react'

function Manage() {

    const [activetab,setactivetab]=useState("user")
    return (
        <div className='admin-dashboard'>
          <div className="table-wrapper">
            <div className="manage-tabs"><span className={`manage-tab ${activetab==='user'&&'active'}`} onClick={()=>{setactivetab("user")}}>Add User</span> <span className={`manage-tab ${activetab==='department'&&'active'}`} onClick={()=>{setactivetab("department")}}>Add Department</span></div>
          </div>
          <form className='adduser-form'>
            <div className="form-ctrl">
                <label htmlFor="system-user">User Name</label>
                <input type="text" name="user" id="system-user" />
            </div>
            <div className="form-ctrl">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="form-ctrl">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div className="forgot-signin sigup-btn-conatiner">
                <button className="btn-login">Sign Up</button>
              </div>
          </form>
        </div>
      )
}

export default Manage
