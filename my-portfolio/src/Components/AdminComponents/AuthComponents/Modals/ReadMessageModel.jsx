import axios from 'axios'
import React from 'react'
import CommonAlert from '../../../../Utilities/CommonAlert'
import { MdEditSquare } from "react-icons/md";


let API_URL = process.env.REACT_APP_API_URL

const ReadMessageModel = (props) => {
   const {email, message, name, phone} = props.message.contactData
   const id = props.message._id
   const getContactsData = props.getContactsData

   console.log("props id", id )

   const handleDeleteMessage = async () => {
      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
      if(MyPortFolioLogin){
         const headers = {
            " Content-Type":'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken, 
            'user': MyPortFolioLogin.user
         };

         const response =await axios.delete(`${API_URL}/admin/contactus/deleteMassage/${id}`, {data : {a: "a"}, headers : headers})
         
         console.log("delete data : ", response )
         if(response.data.success){
            CommonAlert(response.data.success, "error")
            getContactsData()
         }else if(response.data.warning){
            CommonAlert(response.data.warning, "warning")
         }

      }
   }


   const handleunReadMessage = async () => {
      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
      if(MyPortFolioLogin){
         const headers = {
            " Content-Type":'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken, 
            'user': MyPortFolioLogin.user
         };


         const response =await axios.put(`${API_URL}/admin/contactus/unReadMassage/${id}`, {}, {headers})
         
         console.log("update data : ", response )
         if(response.data.success){
            // CommonAlert(response.data.success, "success")
            getContactsData()
         }else if(response.data.warning){
            // CommonAlert(response.data.warning, "warning")
         }

      }
   }

  return (
    <>
      {/* Button trigger modal  */}
      {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      Launch demo modal
      </button> */}

       {/* Modal  */}
      <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title" id="exampleModalCenterTitle">Message from '{name}'</h5>
               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div className="modal-body">
               <div className="d-flex justify-content-between py-2">
                  <h6>Email : </h6> <p className='m-0'>{email}</p>
               </div><hr className='m-0' />
               
               <div className="d-flex justify-content-between py-2">
                  <h6>Phone : </h6> <p className='m-0'>{phone}</p>
               </div><hr className='m-0' />

               <div className="d-flex justify-content-between py-2">
                  <h6 mr-3>Message : </h6> <p className='m-0'>{message}</p>
               </div>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-outline-dark" data-dismiss="modal" onClick={() => handleunReadMessage()} >UnRead <MdEditSquare /></button>
            <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={()=>handleDeleteMessage()} >Delete</button>
            </div>
         </div>
      </div>
      </div>
    </>
  )
}

export default ReadMessageModel
