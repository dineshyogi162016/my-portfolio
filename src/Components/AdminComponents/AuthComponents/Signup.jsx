import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import axios from 'axios';
import CommonAlert from '../../../Utilities/CommonAlert';
import { useNavigate } from 'react-router-dom';

let API_URL = process.env.REACT_APP_API_URL

const Signup = () => {
   const [data, setdata] = useState({
      name : "",
      email : "",
      password : ""
   })

   const [error, seterror] = useState({})
   const [passwordshow, setpasswordshow] = useState("password")

   const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   const passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

   const navigate= useNavigate()

   const handlechange = (e) => {
      setdata({...data, [e.target.name]: e.target.value})
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
            let response = await axios.post(`${API_URL}/admin/signup`, data )
            
            if(response.data.success){
               CommonAlert(response.data.success, "success")

               setdata({name : "",email : "",password : ""})
               navigate("/admin")

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

      if(data.name.length === 0 ){
         localError.name = "Name required"
         valid = false
      }else if(data.name.length < 4){
         localError.name = "Name must be 4 characters"
         valid = false
      }

      if(data.email.length === 0){
         localError.email = "Email required"
         valid = false
      }else if(!emailregex.test(data.email)){
         localError.email = "Not valid email"
         valid = false
      }

      if(data.password.length === 0){
         localError.password = "Password required"          
         valid = false
      }else if(data.password.length < 8 ){
         localError.password = "Password must be 8 characters"
         valid = false
      }else if (!passwordregex.test(data.password)){
         localError.password = "Not valid password"
         valid = false
      }

      seterror(localError)
      return valid;
   }

  return (
    <>
      <div className="signup sign-in flip-backToFront contaier col-xl-6 col-lg-8 col-md-9 col-sm-8 col-10 mx-auto row p-0">
         <div className="right col-md-8 py-5 .col-12">
            <h4 className='font-weight-bold'>Sign Up Form</h4>
            <div className="">
               <label htmlFor="" className='w-75 mt-2 '>
                  <input type="text" className="form-control" placeholder='Name' onChange={handlechange} name='name' value={data.name} />
                  {error.name && <p className='text-danger'>{error.name}</p> }
               </label>

               <label htmlFor="" className='w-75 mt-2'>
                  <input type="text" className="form-control" placeholder='Email' onChange={handlechange} name='email' value={data.email} />
                  {error.email && <p className='text-danger' >{error.email}</p> }
               </label>

               <label className='w-75 mt-2 ' style={{position:"relative"}}>
                  <input type={passwordshow} placeholder='Password' className='form-control w-100'  value={data.password} onChange={handlechange} name='password' />
                  <span style={{position:"absolute", right:"10px", top:"5px", cursor:"pointer"}} onClick={handlepasswordshowornot} >{(passwordshow==="password"? <FaRegEyeSlash/> : <FaRegEye/> )}</span>
                  {error.password && <p className='text-danger' >{error.password}</p> }
               </label>
               <label htmlFor="" className='w-75 mt-2'>
                  <button onClick={handleSubmit} className="btn text-light border-0 font-weight-bold w-100 Blue-liniar-background">Sign Up</button>
               </label>

            </div>   
         </div>
         <div className="left col-md-4 py-5 Blue-liniar-background text-light .col-12">
            <h1 className='' >Hello!</h1>
            <p>If you have account.</p>
            <button className='btn btn-light w-75 font-weight-bold' onClick={()=>navigate("/admin")} >Login</button>
         </div>
      </div>
    </>
  )
}

export default Signup
