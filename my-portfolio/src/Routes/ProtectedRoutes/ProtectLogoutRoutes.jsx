import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNavbar from '../../Components/AdminComponents/AuthComponents/AdminNavbar';
import AdminSidebar from '../../Components/AdminComponents/AuthComponents/AdminSidebar';

const ProtectLogoutRoutes = (props) => {
   const {Component} = props;
   const navigate = useNavigate()

   const [SidebarTogel, setSidebarTogel] = useState(true)

   useEffect(() => {
      let checkLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) || {}

      if(!checkLogin.authToken){
         navigate("/admin")
      }
   })
  return (
    <div>
      <div className="MainPage">
        <div className="admin-nav-menu" >
          <AdminNavbar SidebarTogel={SidebarTogel} setSidebarTogel={setSidebarTogel} /> 
        </div>
        <div className="AllSection d-flex justify-content-left">
        {SidebarTogel && <div className="admin-sidebar  shadow Slide-leftToRight" style={{position: "fixed", top: "56px",left: "0", zIndex: "8",height: "100vh", background: "#fff"}} >
            <AdminSidebar />
          </div>}
          <div className="contentBar p-5">
            <Component />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtectLogoutRoutes
