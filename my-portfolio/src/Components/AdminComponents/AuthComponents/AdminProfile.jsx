import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import profileThumbnail from '../../../Utilities/Images/profileUploadThumbnail.png'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useAuth } from '../../../Utilities/ContextAPI/ContextState';
import CommonAlert from '../../../Utilities/CommonAlert';

let API_URL = process.env.REACT_APP_API_URL

const AdminProfile = () => {
   const {LogOutSession, checkLoginOrNot} = useAuth()

   const [profileDatas, setprofileDatas] = useState(null)
   const [profileError, setprofileError] = useState({})
   const [errorShow, seterrorShow] = useState(false)
   const [profileData, setprofileData] = useState(null)

   const inputFileRef = useRef(null)

   const varify = () => {
      let localerror = {}
      let valid = true

      if(profileError === null){
         localerror.profileImage = "please select a image";
         valid = false
      }

      setprofileError(localerror)
      return valid
   }

   const handleSubmitProfile = async (e) => {
      e.preventDefault()
      if(varify()){
         seterrorShow(true)
      }
         try {

            const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
            if(MyPortFolioLogin){
               const headers = {
                  " Content-Type":'multipart/form-data',
                  'Authorization': MyPortFolioLogin.authToken, 
                  'user': MyPortFolioLogin.user
               };

               const formDataToSend = new FormData()
               formDataToSend.append("profileImage", profileDatas)
               formDataToSend.append("userName", MyPortFolioLogin.userName)

               
               let response = await axios.post(`${API_URL}/admin/profile/profilepost`, formDataToSend, {headers} )
               
               if(response.data.expire){
                  LogOutSession()
               }else if(response.data.success){
                  CommonAlert(response.data.success, "success")
                  setprofileDatas(null)
                  seterrorShow(false)
                  handleGetProfile()
               }else{
                  CommonAlert("something wrong", "warning")
               }

            }

         } catch (error) {
            CommonAlert("Something went wrong")
         }
      
   }


   const handleGetProfile = async() => {
      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
      if(MyPortFolioLogin){
         const headers = {
            " Content-Type":'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken, 
            'user': MyPortFolioLogin.user
         };

         try {
             const result =await axios.get(`${API_URL}/admin/profile/getProfile`, {headers});
     
             if(result.data.response.adminProfile){
                 const imageUrl = result.data.response.adminProfile.profileImage
                 const User = result.data.response.user
                 const UserName = result.data.response.adminProfile.userName
     
                 setprofileData({
                     profileImage : imageUrl,
                     user : User,
                     userName : UserName
                 })
             }
     
     
         } catch (error) {
             CommonAlert("Something went wrong", "warning")
         }

      }
         
   }

   const handleImageChange = () => {
      inputFileRef.current.click()
   }

   useEffect(() => {
      handleGetProfile()
   },[])
  return (
    <>
      <div className="admin-profile w-50 mx-auto shadow p-3">
         <h1>Profile Data </h1><hr />
         <div className="profile-image-section">
            <form onSubmit={(e) => handleSubmitProfile(e)} >

               <div className="admin-profile-image mx-auto position-relative" style={{width: "180px", height: "180px"}}>
                  <img  src={profileData? `../uploads/${profileData.profileImage}` : profileThumbnail} alt="Image Error" width={175} height={175} />

                  <AddPhotoAlternateIcon className='imageUploadIcon' onClick={handleImageChange} />
               </div>
               {profileDatas? <p>{profileDatas.name}</p> : errorShow && <p className='text-danger' >please select a image</p>}
               <input ref={inputFileRef} type="file" id="profileImage" className="form-control my-3" onChange={(e) => setprofileDatas(e.target.files[0])} name='profileImage' accept="image/*" style={{display: "none"}} />
               
               <button className="admin-button my-3" >Upload</button>

            </form>
            {/* {profileData && 
               <div className="" style={{textAlign: "end"}}>
                  <h3 className='mt-3' >{profileData.user}</h3>
                  <h3 className='mt-3' >{profileData.userName}</h3>
               </div>
            } */}
         </div>
      </div>
    </>
  )
}

export default AdminProfile
