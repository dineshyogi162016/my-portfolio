import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CommonAlert from '../../../Utilities/CommonAlert'
import ContextAPI from "../../../Utilities/ContextAPI/ContextState"
import { useAuth } from '../../../Utilities/ContextAPI/ContextState'

let API_URL = process.env.REACT_APP_API_URL

const Dashboard = () => {
   // use Context using 
   const {logOutData, checkLoginOrNot} = useAuth()

   const navigate = useNavigate()

   useEffect(() => {
      checkLoginOrNot()
   },[])
  return (
    <>
       <h1 className='flip-backToFront'>Admin's Dash Board</h1>
    </>
  )
}

export default Dashboard
