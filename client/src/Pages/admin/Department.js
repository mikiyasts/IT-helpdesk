import React,{useState,useEffect} from 'react'
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import LoadingBtn from "../../component/LoadingBtn";
import EditIcon from '@mui/icons-material/Edit';
function Department() {
  
    const [departments, setDepartments] = useState([]);
    const [popup,setPopup]=useState(false)
    const [popupadd,setPopupadd]=useState(false)
    const [form,setForm]=useState({})
    const [edited,setEdited]=useState({})
    const [loading,setLoading]=useState(false)
    const [newdepartment,setnewDepartment]=useState({
      name:"",
  })
    useEffect(() => {
  
      axios
        .get(`${process.env.REACT_APP_URL}/api/departments/`, {
          headers: {
            Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => setDepartments(res.data))
        .catch((err) => console.log(err));
  
  
        
    }, []);
  
    const refreshData=()=>{
      axios
        .get(`${process.env.REACT_APP_URL}/api/departments/`, {
          headers: {
            Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => setDepartments(res.data))
        .catch((err) => console.log(err));
    }
    console.log(departments);
    let rwnum=0
    const tableRw = departments.map((el) => {
        rwnum++
        let users=0
        let count
       axios.get(`${process.env.REACT_APP_URL}/api/systemusers/`, {
            headers: {
              Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
            },
          })
          .then((res) =>{
            users=res.data.filter(fl=>fl.department===el.name).length
            console.log("users filtter",users);

            return users
            console.log("users length",users.length);
          })
          .catch((err) => console.log(err));

      return (<tr key={el.id}>
        <td data-cell="No">{el.id}</td>
        <td data-cell="Department name">{`${el?.name}`} </td>
        <td data-cell="Userse">{`${users && users}`} </td>
        <td className="opt-dots" style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}>
       <EditIcon sx={{fill:"#8470ff"}} onClick={()=>{
          setPopup(true)
          setPopupadd(false)
          setForm(el)
        }}/>
        </td>
      </tr>)
});
  
   
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
      
      setnewDepartment(prev=>{
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
  console.log("new",newdepartment);
  
  const submitEdit=(e)=>{
    e.preventDefault()
    const getCsrfToken = () => {
      const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrftoken='))
          ?.split('=')[1];
      return cookieValue || '';
  };
  
    axios.patch(`${process.env.REACT_APP_URL}/api/edit_department/${form.id}/`,
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
  const createDepartment=(e)=>{
    e.preventDefault()
    const getCsrfToken = () => {
      const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrftoken='))
          ?.split('=')[1];
      return cookieValue || '';
  };
  
    axios.post(`${process.env.REACT_APP_URL}/api/create_department/`,
      newdepartment ,{
      headers: {
        'X-CSRFToken': getCsrfToken(),
        Authorization: `API_KEY ${process.env.REACT_APP_API_KEY}`,
      },
    }
    ).then(res=>{
      setPopupadd(false)
      setnewDepartment({
        name:"",
    })
      refreshData()
      console.log("succes",res);
      
    }).catch(err=>{
      console.log(err,"errr");
      
    })
  }
  
  console.log("department",departments);
  
  
    return (
      <div className="admin-dashboard">
        
        <div className="table-wrapper">
          <div className="card-table">
            <div
              className="card-header"
              style={{ padding: "1.5rem", borderBottom: ".5px solid #f2f2f225" }}
            >
              <h3>All departments <sub style={{color:"#f2f2f2",fontWeight:"lighter",fontSize:"small"}}>{departments.length}</sub></h3>
              <button className="btn-login" title="Add User" onClick={()=>{setPopupadd(true); setPopup(false)}}><AddIcon/><span>Add Department</span></button>
  
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <td>No</td>
                    <td>Department Name</td>
                    <td>Users</td>
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
  
        <div className={`popup ${popup &&"active"}`} style={{backgroundColor:"#111827"}}>
          <div className="popup-pin" onClick={()=>{
          setPopup(false)
    }} style={{backgroundColor:"#1f2937"}}></div>
         
          <div className="popup_header"><h2>Edit Department</h2></div>
  
          <form className="request-form" onSubmit={submitEdit}>
            <div className="form-ctrl">
              <label htmlFor="department_name">Department Name</label>
              <input type="text" name="name" id="department_name" value={form && form.name} onChange={setInput}/>
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
         
          <div className="popup_header"><h2>Add New Department</h2></div>
  
          <form className="request-form" onChange={userInput} onSubmit={createDepartment}>
            <div className="form-ctrl">
              <label htmlFor="department_name">Department Name <span>*</span></label>
              <input type="text" name="name" id="department_name" required value={newdepartment && newdepartment.name}/>
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

export default Department
