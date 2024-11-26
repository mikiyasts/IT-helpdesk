import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import LoadingBtn from "../../component/LoadingBtn";
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '../../component/Pagination';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Users() {
  const [users, setUsers] = useState([]);
  const [popup,setPopup]=useState(false)
  const [popupadd,setPopupadd]=useState(false)
  const [form,setForm]=useState({})
  const [edited,setEdited]=useState({})
  const [dept,setDept]=useState([])
  const [keyword,setKeyword]=useState("")
  const [loading,setLoading]=useState(false)
  const [newuser,setNewuser]=useState({
    username:"",
    password:"",
    email:"",
    department:"",
    branch:"",
    phone_number:"",
    first_name:"",
    last_name:""
})


const [currentPage, setCurrentPage] = useState(1);
const [recordsPerPage] = useState(20);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentRecords = users.slice(indexOfFirstRecord, 
indexOfLastRecord);
const nPages = Math.ceil(users.length / recordsPerPage)
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
  console.log(keyword);
  const tableRw = currentRecords.filter(fl=>{

    return `${fl?.first_name} ${fl?.last_name}`.toLowerCase().includes(keyword.toLowerCase())
  }).map((el) => (
    <tr>
      <td data-cell="ID">{el.id}</td>
      <td data-cell="User name">{`${el?.first_name} ${el?.last_name}`} </td>
      <td data-cell="Role">{el.role}</td>
      <td data-cell="Branch">{el.branch}</td>
      <td data-cell="Dept">{el.department}</td>
      <td className="opt-dots" style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}>
     <EditIcon sx={{fill:"#8470ff"}} onClick={()=>{
        setPopup(true)
        setPopupadd(false)
        setForm(el)
      }}/>
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
  const userInput=(e)=>{
    console.log(e.target.value);
    
    setNewuser(prev=>{
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
console.log("new",newuser);

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
    toast.success("User Editted Successfuly")
    console.log("succes",res);
    
  }).catch(err=>{
    setPopup(false)
    toast.error("User Edit Failed")

    console.log(err,"errr");
    
  })
}
const createUser=(e)=>{
  e.preventDefault()
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};

  axios.post(`${process.env.REACT_APP_URL}/api/create_user/`,
    newuser ,{
    headers: {
      'X-CSRFToken': getCsrfToken(),
      Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
    },
  }
  ).then(res=>{
    setPopup(false)
    setNewuser({
      username:"",
      password:"",
      email:"",
      department:"",
      branch:"",
      phone_number:"",
      first_name:"",
      last_name:""
  })
    refreshData()
    toast.success("User Created Successfuly")
    console.log("succes",res);
    
  }).catch(err=>{
    toast.error("Creating User Failed")

    console.log(err,"errr");
    
  })
}

const search=(e)=>{
  setKeyword(e.target.value)
}


  return (
    <div className="admin-dashboard">
      <ToastContainer />
      
      <div className="table-wrapper">
        <div className="card-table">
          <div
            className="card-header"
            style={{ padding: "1.5rem", borderBottom: ".5px solid #f2f2f225" }}
          >
            <h3>All Users <sub style={{color:"#f2f2f2",fontWeight:"lighter",fontSize:"small"}}>{users.length}</sub></h3>
            <form ><input type="text" name="user" id="user" className="search-input" placeholder="Search" onChange={search}/></form>
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
            <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <div className={`popup ${popup &&"active"}`} style={{backgroundColor:"#111827"}}>
        <div className="popup-pin" onClick={()=>{
        setPopup(false)
  }} style={{backgroundColor:"#1f2937"}}></div>
       
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
      <div className={`popup ${popupadd &&"active"}`} style={{backgroundColor:"#111827"}}>
        <div className="popup-pin" onClick={()=>{
    setPopupadd(false)
  }} style={{backgroundColor:"#1f2937"}}></div>
       
        <div className="popup_header"><h2>Add New User</h2></div>

        <form className="request-form" onChange={userInput} onSubmit={createUser}>
          <div className="form-ctrl">
            <label htmlFor="username">User Name <span>*</span></label>
            <input type="text" name="username" id="username" required value={newuser && newuser.username}/>
          </div>
          
          <div className="form-ctrl">
            <label htmlFor="password">Password <span>*</span></label>
            <input type="text" name="password" id="password" required  value={newuser && newuser.password}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="email">Email <span>*</span></label>
            <input type="email" name="email" id="email" required  value={newuser && newuser.email}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="dept">Department</label>
            <select name="department" id="dept" value={newuser && newuser.department===null?"":newuser.department}>
              <option value="">Select Department</option>
              {deptOption}
            </select>
          </div>
          <div className="form-ctrl">
            <label htmlFor="branch">Branch</label>
            <select name="branch" id="branch"  value={newuser && newuser.branch===null?"":newuser.branch}>
            <option value="">Select Your Branch</option>
              <option value="Farm">Farm</option>
              <option value="Kality">Kality</option>
              <option value="Lideta">Lideta</option>
              <option value="Mekanissa">Mekanissa</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label htmlFor="phone_number">Phone_number <span>*</span></label>
            <input type="phone_number" name="phone_number" id="phone_number" required value={newuser && newuser.phone_number}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="first_name">First_name <span>*</span></label>
            <input type="first_name" name="first_name" id="first_name" required  value={newuser && newuser.first_name}/>
          </div>
          <div className="form-ctrl">
            <label htmlFor="last_name">Last_name <span>*</span></label>
            <input type="last_name" name="last_name" id="last_name" required  value={newuser && newuser.last_name}/>
          </div>
         
          <div className="forgot-signin sigup-btn-conatiner">
                {
                loading? <LoadingBtn/> :<button className="btn-login">Submit</button>}
              </div>
        </form>
      </div>
      {/* popup*/}
    </div>
  );
}

export default Users;
