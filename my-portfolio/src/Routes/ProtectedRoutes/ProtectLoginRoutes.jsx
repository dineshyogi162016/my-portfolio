import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectLoginRoutes = (props) => {
   const {Component} = props;
   const navigate = useNavigate()

   useEffect(() => {
    let checkLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) || {}

    if(checkLogin.authToken){
         navigate("/admin/dashboard")
      }
   })
  return (
    <div>
      <Component />
    </div>
  )
}

export default ProtectLoginRoutes
