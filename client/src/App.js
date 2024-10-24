import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Logo from "./asset/Image/logo.png";
import Header from './component/Header';
import Dashboard from './Pages/user/Dashboard';
import { useEffect, useState } from 'react';
import AdminHeader from "./component/AdminHeader"
import AdminDashboard from './Pages/admin/AdminDashboard';
import Completed from './Pages/admin/Completed';
import Pending from './Pages/admin/Pending';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Manage from './Pages/admin/Manage';
import Inprogress from './Pages/admin/Inprogress';
import ProtectedRoutes from './Pages/ProtectedRoutes';
import { AuthContext } from './Context/AuthContext';
import Tickets from './Pages/admin/Tickets';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import AssessmentIcon from '@mui/icons-material/Assessment';
function App() {

  const [isAuth, setIsAuth] = useState(false)

  const [page, setPage] = useState(sessionStorage.getItem("page") || "Dashboard")


  useEffect(() => {
    sessionStorage.setItem("page", page)
  }, [page])
  const url = window.location.pathname
  const urlsplit = url.split("/")
  useEffect(() => {
    if (urlsplit[urlsplit.length - 1] === "admin") {
      return setPage("dashboard")
    }
    if (urlsplit[urlsplit.length - 1] === "inprogress") {
      return setPage("In Progress")
    }
    setPage(urlsplit[urlsplit.length - 1])

  }, [])

  //  sessionStorage.clear("page")

  const ToggleSideBar = () => {
    const sidebar = document.querySelector(".sidebar")
    const sidebarhum = document.querySelectorAll(".sidebar-humburger div")
    sidebar.classList.toggle("active")
    sidebarhum.forEach(e => {
      e.classList.toggle('active')
    });
  }

  const AdminLayout = () => {
    return <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-humburger" onClick={ToggleSideBar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="logo"><img src={Logo} alt="logo" width="45px" /></div>
        <div className="sidebar-main">
          <ul>
            <Link to="/admin" onClick={() => setPage("dashboard")} className={page === "dashboard" ? "active":""}><DashboardIcon/> Dashboard</Link>
            <Link to="tickets" onClick={() => setPage("tickets")} className={page === "tickets" ? "active":""}><ConfirmationNumberIcon/> Tickets</Link>
            <Link to="pending" onClick={() => setPage("pending")} className={page === "pending" ? "active":""}><GroupIcon/>Users</Link>
            <Link to="inprogress" onClick={() => setPage("In Progress")} className={page === "In Progress" ? "active":""}><ForumIcon/>Chat</Link>
            <Link to="manage" onClick={() => setPage("manage")} className={page === "manage" ? "active":""}><AssessmentIcon/>Report</Link>
          </ul>
        </div>
      </div>
      <div className="admindashboard-main">
        <AdminHeader
          togglesidebar={ToggleSideBar}
        />
        <div className="admin_main-container">
          <div className="page-name"><h1>{page}</h1></div>
          <div className="admin-outlets">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  }
  return (

    <div className="App">
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        {/* <Header/> */}
        <Routes>
          <Route index element={<Login />}></Route>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path='completed' element={<Completed />} />
              <Route path='tickets' element={<Tickets />} />
              <Route path='pending' element={<Pending />} />
              <Route path='inprogress' element={<Inprogress />} />
              <Route path='manage' element={<Manage />} />
            </Route>
            <Route path="*" element={<h1>ALU ALU</h1>}></Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
