import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import LoadingBtn from "../../component/LoadingBtn";
function Users() {
  const [users, setUsers] = useState([]);
  const [popup,setPopup]=useState(false)
  const [popupadd,setPopupadd]=useState(false)
  const [form,setForm]=useState({})
  const [edited,setEdited]=useState({})
  const [dept,setDept]=useState([])
  const [loading,setLoading]=useState(false)
//   const [newuser,setNewuser]=useState({
//     username:"",
//     password:"",
//     email:"",
//     department:"",
//     branch:"",
//     phone_number:"",
//     first_name:"",
//     last_name:""
    



// })
  useEffect(() => {

    axios
      .get(`${process.env.REACT_APP_URL}/api/systemusers/`, {
        headers: {
          Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));


      axios.get(`${process.env.REACT_APP_URL}/api/departments`,{
        headers:{
          Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
        }
      }).then(res=>{
        setDept(res.data)
        
      }).catch(err=>{
        console.log("You are Not Authorized !!");
        
      })
  }, []);

  const refreshData=()=>{
    axios
      .get(`${process.env.REACT_APP_URL}/api/systemusers/`, {
        headers: {
          Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }
  console.log(users);
  const tableRw = users.map((el) => (
    <tr>
      <td data-cell="ID">{el.id}</td>
      <td data-cell="User name">{`${el?.first_name} ${el?.last_name}`} </td>
      <td data-cell="Role">{el.role}</td>
      <td data-cell="Branch">{el.branch}</td>
      <td data-cell="Dept">{el.department}</td>
      <td className="opt-dots">
      <button className="btn-solved" onClick={()=>{
        setPopup(true)
        setPopupadd(false)
        setForm(el)
      }}>Edit</button>
      </td>
    </tr>
  ));

  const deptOption=dept.map(el=><option value={Number(el.id)}>{el.name}</option>)
  const setInput=(e)=>{
    console.log(e.target.value);
    
    setForm(prev=>{
      return {
        ...prev,
        [e.target.name]:e.target.name==="department"? Number(e.target.value):e.target.value
      }
    })

    setEdited(prev=>{
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
    console.log(form);
    
  }
console.log("inin",form);
console.log("ed",edited);

const submitEdit=(e)=>{
  e.preventDefault()
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};

  axios.patch(`${process.env.REACT_APP_URL}/api/edituser/${form.id}/`,
    edited ,{
    headers: {
      'X-CSRFToken': getCsrfToken(),
      Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
    },
  }
  ).then(res=>{
    setPopup(false)
    setEdited({})
    setForm({})
    refreshData()
    console.log("succes",res);
    
  }).catch(err=>{
    console.log(err,"errr");
    
  })
}

  return (
    <div className="admin-dashboard">
      <div className="table-wrapper">
        <div className="card-table">
          <div
            className="card-header"
            style={{ padding: "1.5rem", borderBottom: ".5px solid #f2f2f225" }}
          >
            <h3>All Users <sub style={{color:"#f2f2f2",fontWeight:"lighter",fontSize:"small"}}>{users.length}</sub></h3>
            <button className="btn-login" title="Add User" onClick={()=>{setPopupadd(true); setPopup(false)}}><AddIcon/><span>Add User</span></button>

          </div>
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
                {tableRw}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`popup ${popup &&"active"}`}>
        <div className="popup-pin" onClick={()=>{
        setPopup(false)
  }}></div>
       
        <div className="popup_header"><h2>Edit User</h2></div>

        <form className="request-form" onSubmit={submitEdit}>
          <div className="form-ctrl">
            <label htmlFor="username">User Name</label>
            <input type="text" name="username" id="username" value={form && form.username} onChange={setInput}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="role">Role</label>
            <select name="role" id="role" onChange={setInput} value={form && form.role===null?"":form.role}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label htmlFor="branch">Branch</label>
            <select name="branch" id="branch" onChange={setInput} value={form && form.branch===null?"":form.branch}>
            <option value="">Select Your Branch</option>
              <option value="Farm">Farm</option>
              <option value="Kality">Kality</option>
              <option value="Lideta">Lideta</option>
              <option value="Mekanissa">Mekanissa</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label htmlFor="dept">Department</label>
            <select name="department" id="dept" onChange={setInput} value={form && form.department===null?"":form.department}>
              <option value="">Select Department</option>
              {deptOption}
            </select>
          </div>
          <div className="form-ctrl">
            <label htmlFor="email">email</label>
            <input type="email" name="email" id="name"  onChange={setInput} value={form && form.email}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="phon_num">Phone number</label>
            <input type="text" name="phone_number" id="phon_num"  onChange={setInput} value={form.phone_number}/>
          </div>
          <div className="forgot-signin sigup-btn-conatiner">
                <button className="btn-login">Submit</button>
              </div>
        </form>
      </div>
      
      {/* popup*/}
      {/* <div className={`popup ${popupadd &&"active"}`}>
        <div className="popup-pin" onClick={()=>{
    setPopupadd(false)
  }}></div>
       
        <div className="popup_header"><h2>Add New User</h2></div>

        <form className="request-form" >
          <div className="form-ctrl">
            <label htmlFor="req_name">User Name <span>*</span></label>
            <input type="text" name="username" id="username" required/>
          </div>
          
          <div className="form-ctrl">
            <label htmlFor="password">Password <span>*</span></label>
            <input type="text" name="password" id="password"  onChange={setInput} required/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="Email">Email <span>*</span></label>
            <input type="email" name="Email" id="Email"  onChange={setInput} required/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="Email">Email <span>*</span></label>
            <input type="email" name="Email" id="Email"  onChange={setInput} required/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="Email">Email <span>*</span></label>
            <input type="email" name="Email" id="Email"  onChange={setInput} required/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="Email">Email <span>*</span></label>
            <input type="email" name="Email" id="Email"  onChange={setInput} required/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="Email">Email <span>*</span></label>
            <input type="email" name="Email" id="Email"  onChange={setInput} required/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="Email">Email <span>*</span></label>
            <input type="email" name="Email" id="Email"  onChange={setInput} required/>
          </div>
          <div className="forgot-signin sigup-btn-conatiner">
                {
                loading? <LoadingBtn/> :<button className="btn-login">Submit</button>}
              </div>
        </form>
      </div> */}
      {/* popup*/}
    </div>
  );
}

export default Users;
