import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import axios from 'axios';
import CommonAlert from '../../../Utilities/CommonAlert';
import { json, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Utilities/ContextAPI/ContextState';


let API_URL = process.env.REACT_APP_API_URL

const Login = () => {

   // use Context using 
   // const {LogOutSession} = useAuth()

   const [data, setdata] = useState({
      userDetails : {
         email : String,
         password : String
      }
   })
   
   
   
   const [error, seterror] = useState({})
   const [passwordshow, setpasswordshow] = useState("password")
   const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   const passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
   
   let navigate = useNavigate()

   const handlechange = (e) => {
      setdata({...data, userDetails: {...data.userDetails, [e.target.name]: e.target.value }})
   }


   const handlepasswordshowornot = ()=>{
      if(passwordshow=== "password"){
         setpasswordshow("text");
      }else{
         setpasswordshow("password")
      }
   }

   const handleSubmit = async() => {
      if(varify()){
         try {
            let response = await axios.post(`${API_URL}/admin/login`, data )
            
            if(response.data.success){
               CommonAlert(response.data.success, "success")
               localStorage.setItem("MyPortfolioLogin", JSON.stringify(response.data))

               navigate("/admin/dashboard")
               // setdata({data.userDetails.email : "", data.userDetails.password : ""})

               setTimeout(() => {
                  
                  // LogOutSession()

               }, 1000*60*60 );

            }else if (response.data.warning){
               CommonAlert(response.data.warning, "warning")
            }else{
               CommonAlert(response.data.error, "error")
            }

         } catch (error) {
            CommonAlert("Something wrong", "warning")
         }
      }
   }


   const varify = () => {
      let localError = {}
      let valid = true;

      if(data.userDetails.email.length === 0){
         localError.email = "Email required"
         valid = false
      }else if(!emailregex.test(data.userDetails.email)){
         localError.email = "Not valid email"
         valid = false
      }

      if(data.userDetails.password.length === 0){
         localError.password = "Password required"          
         valid = false
      }else if(data.userDetails.password.length < 8 ){
         localError.password = "Password must be 8 characters"
         valid = false
      }else if (!passwordregex.test(data.userDetails.password)){
         localError.password = "Not valid password"
         valid = false
      }

      seterror(localError)
      return valid;
   }

  return (
    <>
      <div className="signup sign-in flip-backToFront contaier col-xl-6 col-lg-8 col-md-9 col-sm-8 col-10 mx-auto row p-0">
         <div className="left col-md-4 py-5 Blue-liniar-background text-light .col-12">
            <h1 className='' >Hello!</h1>
            <p>If you don't have account.</p>
            <button className='btn btn-light w-75 font-weight-bold' onClick={()=>navigate("/signup")} >Sign Up</button>
         </div>
         <div className="right col-md-8 py-5 .col-12">
            <h4 className='font-weight-bold'>Login Form</h4>
            <div className="">
               <label htmlFor="" className='w-75 mt-2'>
                  <input type="text" className="form-control" placeholder='Email' onChange={handlechange} name='email' value={data.userDetails.email} />
                  {error.email && <p className='text-danger' >{error.email}</p> }
               </label>

               <label className='w-75 mt-2 ' style={{position:"relative"}}>
                  <input type={passwordshow} placeholder='Password' className='form-control w-100'  value={data.userDetails.password} onChange={handlechange} name='password' />
                  <span style={{position:"absolute", right:"10px", top:"5px", cursor:"pointer"}} onClick={handlepasswordshowornot} >{(passwordshow==="password"? <FaRegEyeSlash/> : <FaRegEye/> )}</span>
                  {error.password && <p className='text-danger' >{error.password}</p> }
               </label>
               <label htmlFor="" className='w-75 mt-2'>
                  <button onClick={handleSubmit} className="btn text-light border-0 font-weight-bold w-100 Blue-liniar-background">Login</button>
               </label>

            </div>   
         </div>
      </div>
    </>
  )
}

export default Login
