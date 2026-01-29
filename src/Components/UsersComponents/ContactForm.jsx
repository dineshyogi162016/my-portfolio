import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Utilities/ContextAPI/ContextState'
import axios from 'axios'
import CommonAlert from '../../Utilities/CommonAlert'

let API_URL = process.env.REACT_APP_API_URL

const ContactForm = () => {
  const {ParamsforHome} = useAuth()

  const [contactData, setcontactData] = useState({
    name : "",
    email : "",
    phone : "",
    message : ""
  })
  const [error, seterror] = useState({})

  const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const phoneNumRegex = /^\+\d{1,4}\d*$/;

  const handleChange = (e) => {
    setcontactData({...contactData, [e.target.name]: e.target.value})
  }


  const varify = () => {
    let localError = {}
    let valid = true;

    if(contactData.name.length === 0){
      localError.name = "name is required!";
      valid = false;
    }else if(contactData.name.length < 4){
        localError.name= "name must be 4 characters.";
        valid= false;
    }

    if(contactData.email.length === 0){
       localError.email = "Email required"
       valid = false
    }else if(!emailregex.test(contactData.email)){
       localError.email = "Not valid email"
       valid = false
    }

    if(contactData.phone.length === 0){
      localError.phone = "Phone No. is required!";
      valid = false;
   }else if(!phoneNumRegex.test(contactData.phone)){
      localError.phone = "Not valid number"
      valid = false; 
   }

    seterror(localError)
    return valid;
 }

 const handleConnect =async () => {
  if(varify()){
    try {
      let response = await axios.post(`${API_URL}/user/contactus/${ParamsforHome}`, contactData )
      
      if(response.data.success){
         CommonAlert(response.data.success, "success")
      }
    }catch (error){
      CommonAlert("Something went wrong", "warning")
    }
  }
 }
  // console.log("dAta contact : ", contactData )

  useEffect(() => {

  }, [])
  return (
    <>
      <div className="container" style={{maxWidth: "800px"}} >
        <div className="heading-section text-light">
          <h1 >Contact Me</h1>
        </div>
        <div className="content-section contact-form-section mt-4">
          < >
            <div className="d-flex justify-content-between" style={{}}>
              <div className="" style={{width: "31%" }}>
                <input type="text" placeholder='Your Name' onChange={handleChange} name='name' className="bg-transparent p-2 text-light" style={{border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", width: "100%"}}/>
                {error.name && <p className='m-0' style={{color: "rgb(207, 31, 31)"}} >{error.name}</p>}
              </div>
              <div className="" style={{width: "31%" }}>
                <input type="text" placeholder='Your Email' onChange={handleChange} name='email' className="bg-transparent p-2  text-light" style={{border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", width: "100%"}}/>
                {error.email && <p className='m-0' style={{color: "rgb(207, 31, 31)"}} >{error.email}</p>}
              </div>
              <div className="" style={{width: "31%" }}>
                <input type="text" placeholder='Your Phone' onChange={handleChange} name='phone' className="bg-transparent p-2  text-light" style={{border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", width: "100%"}}/>
                {error.phone && <p className='m-0' style={{color: "rgb(207, 31, 31)"}} >{error.phone}</p>}
              </div>
            </div>
            <div className="">
              <textarea placeholder='Your Massage' onChange={handleChange} name='message' id="" cols="100" rows="6" className="bg-transparent p-2 mt-4 col col-12 text-light" style={{border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none"}}></textarea>
            </div>

            <div className="mt-4">
              <button onClick={handleConnect} className="text-light font-weight-bold border-0" style={{padding: "7px 40px", backgroundColor: "#CF1F1F"}} >Send Message</button>
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default ContactForm
