import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FaEdit } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ReadMessageModel from './Modals/ReadMessageModel';
import CommonAlert from '../../../Utilities/CommonAlert';

let API_URL = process.env.REACT_APP_API_URL

const AdminContact = () => {
   const [AllMessages, setAllMessages] = useState([])
   const [message, setmessage] = useState(null)

   const getContactsData =async () => {

      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
      if(MyPortFolioLogin){
         const headers = {
            " Content-Type":'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken, 
            'user': MyPortFolioLogin.user
         };
         
            const response =await axios.get(`${API_URL}/admin/profile/getContactUs`, {headers})
            
            setAllMessages(response.data.response)
         }
         
      }

   const handleDeleteMessage = async (e) => {

      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
      if(MyPortFolioLogin){
         const headers = {
            " Content-Type":'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken, 
            'user': MyPortFolioLogin.user
         };

         const response =await axios.delete(`${API_URL}/admin/contactus/deleteMassage/${e._id}`, {data : {a: "a"}, headers : headers})
         
         console.log("delete data : ", response )
         if(response.data.success){
            CommonAlert(response.data.success, "error")
            getContactsData()
         }else if(response.data.warning){
            CommonAlert(response.data.warning, "warning")
         }

      }
   }

   const handleReadMessage = async (e) => {
      setmessage(e)

      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
      if(MyPortFolioLogin){
         const headers = {
            " Content-Type":'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken, 
            'user': MyPortFolioLogin.user
         };


         const response =await axios.put(`${API_URL}/admin/contactus/readMassage/${e._id}`, {}, {headers})
         
         // console.log("update data : ", response )
         if(response.data.success){
            // CommonAlert(response.data.success, "success")
            getContactsData()
         }else if(response.data.warning){
            // CommonAlert(response.data.warning, "warning")
         }

      }
   }


   useEffect(() => {
      getContactsData()
   },[])
  return (
    <>
      <div className="contact-table">
      <table className="table table-striped">
         <thead>
            <tr>
               <th scope="col">Sr. No.</th>
               <th scope="col">Name</th>
               <th scope="col">Email</th>
               <th scope="col">Phone</th>
               <th scope="col">Message</th>
               <th scope="col">Action / Read</th>
               {/* <th scope="col">Read</th> */}
            </tr>
         </thead>
         <tbody>
            {
               AllMessages.map((e, i) => {
                  return(
                     <tr style={{fontWeight: !e.contactData.read && "bold"}} key={i} >
                        <th scope="row">{i+1}</th>
                        <td>{e.contactData.name}</td>
                        <td>{e.contactData.email}</td>
                        <td>{e.contactData.phone}</td>
                        <td>{e.contactData.message.substr(0, 15)}...</td>
                        <td >{<DeleteForeverIcon onClick={()=>handleDeleteMessage(e)} />}
                         {` / `} 

                         <span onClick={()=>handleReadMessage(e)} data-target="#exampleModalCenter" data-toggle="modal" style={{cursor: "pointer", fontSize: "20px"}} >
                           {e.contactData.read ? < FaEdit /> : <MdEditSquare/> }
                         </span>
                        </td>
                     </tr>
                  )
               })
            }
         </tbody>
      </table>

      {message && <ReadMessageModel message={message} getContactsData={getContactsData} />}

      </div>
    </>
  )

}

export default AdminContact
