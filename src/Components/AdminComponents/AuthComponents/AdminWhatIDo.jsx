
import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CommonAlert from '../../../Utilities/CommonAlert';
import axios from 'axios';
import { useAuth } from '../../../Utilities/ContextAPI/ContextState';

let API_URL = process.env.REACT_APP_API_URL

const AdminWhatIDo = () => {

   const { LogOutSession } = useAuth()

   const [whatIDoData, setwhatIDoData] = useState([
      {
         whatIDoLogo: "",
         whatIDoHeading: "",
         whatIDoContent: ""
      }
   ])

   const [educationError, seteducationError] = useState([])

   const educatoinLength = whatIDoData.length;
   // console.log("educatoinLength : ", educatoinLength )
   // console.log("ERrorrr : ", educationError )

   const addWhatIDoSection = () => {
      setwhatIDoData(prevCount => [...prevCount, {
         whatIDoLogo: "",
         whatIDoHeading: "",
         whatIDoContent: ""
      }]);

   }


   const removeWhatIDoSection = (i) => {
      // console.log("Index in remove : ", i)
      if (whatIDoData.length > 1) {
         let aaaa = whatIDoData.filter((item, index) => index !== i)
         setwhatIDoData(aaaa);
      } else {
         CommonAlert("Atleast 1 education required", "warning")
      }

   }


   const getsWhatIDoData = async () => {

      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin"));
      if (MyPortFolioLogin) {
         const headers = {
            "Content-Type": 'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken,
            'user': MyPortFolioLogin.user
         };

         const response = await axios.get(`${API_URL}/admin/getWhatIDoing`, { data: { a: "a" }, headers: headers })

         if (response.data.success) {
            console.log("what i do data : ", response.data)
            if (response.data.response.length > 0) {
               setwhatIDoData(response.data.response)
            }
         } else if (response.data.expire) {
            LogOutSession()
         }
      }
   }


   const handleAddOrUpdateWhatIDo = async () => {

      // if(validForm()){
      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin"));
      if (MyPortFolioLogin) {
         const headers = {
            "Content-Type": 'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken,
            'user': MyPortFolioLogin.user
         };

         const response = await axios.post(`${API_URL}/admin/addWhatIDoing`, { whatIDoing: whatIDoData, headers: headers })

         if (response.data.success) {
            CommonAlert(response.data.success, "success")
         }
      }
      // } 

   }


   const validForm = () => {
      let valid = true;

      whatIDoData.map((item, i) => {

         if (item.whatIDoLogo.length === 0) {
            seteducationError((prev) => {
               let newError = [...prev];
               newError[i] = { ...newError[i], whatIDoLogo: "whatIDoLogo is required" }
               return newError
            });

            valid = false;
         }

         if (item.whatIDoHeading.length === 0) {
            seteducationError((prev) => {
               const newError = [...prev];
               newError[i] = { ...newError[i], whatIDoHeading: "whatIDoHeading is required" }
               return newError
            })
            valid = false;
         }

         if (item.whatIDoContent.length === 0) {
            seteducationError((prev) => {
               let newError = [...prev];
               newError[i] = { ...newError[i], whatIDoContent: "whatIDoContent is required" }
               return newError
            });

            valid = false;
         }


      })

      return valid
   }


   useEffect(() => {
      getsWhatIDoData()
   }, [])
   return (
      <>
         <div className="">
            <button className="admin-button" onClick={handleAddOrUpdateWhatIDo} >Add / Edit What i do</button>
            <div className="d-flex flex-wrap justify-content-around row">
               {
                  whatIDoData.map((item, i) => {
                     return (
                        <div className="col-12 col-xl-4 col-md-6 col-sm-10 " key={i}>

                           <div className="card education-card-admin shadow m-4 Blue-combo-border"  >
                              <div className="card-header Blue-combo-border shadow" >
                                 <h5 className="card-title">What we do <span> {i + 1}</span></h5>
                                 {i === educatoinLength - 1 && <span onClick={addWhatIDoSection} style={{ position: "absolute", top: "0", right: "0", cursor: "pointer" }} ><AddCircleOutlineIcon style={{ fontSize: "30px" }} /></span>}
                              </div>
                              <div className="card-body">
                                 <select name="whatIDoLogo" className={(whatIDoData[i]?.whatIDoLogo ? 'form-control Blue-combo-border shadow' : (educationError[i]?.whatIDoLogo ? 'form-control border-danger shadow' : 'form-control shadow'))} onChange={(e) => { setwhatIDoData((prev) => { const newArr = [...whatIDoData]; newArr[i].whatIDoLogo = e.target.value; return newArr }) }} value={item.whatIDoLogo} >
                                    <optgroup>
                                       <option value="" selected disabled>--Education Type--</option>
                                    </optgroup>
                                    <optgroup>
                                       <option value="Schooler Education">Schooler Education</option>
                                    </optgroup>
                                    <optgroup>
                                       <option value="Graduation">Graduation</option>
                                       <option value="Post Graduation">Post Graduation</option>
                                    </optgroup>
                                 </select>

                                 {(whatIDoData[i].whatIDoLogo ? '' : (educationError[i]?.whatIDoLogo ? <p className='text-danger m-0'>{educationError[i].whatIDoLogo}</p> : ''))}
                                 <br />


                                 <input type="text" name='whatIDoHeading' className={(whatIDoData[i]?.whatIDoHeading ? 'form-control Blue-combo-border shadow' : (educationError[i]?.whatIDoHeading ? 'form-control border-danger shadow' : 'form-control shadow'))} placeholder='Passing year' value={item.whatIDoHeading} onChange={(e) => {
                                    setwhatIDoData((prev) => {
                                       const newArr = [...whatIDoData];
                                       newArr[i].whatIDoHeading = e.target.value;
                                       return newArr;
                                    })
                                 }} />

                                 {(whatIDoData[i].whatIDoHeading ? '' : (educationError[i]?.whatIDoHeading ? <p className='text-danger m-0'>{educationError[i].whatIDoHeading}</p> : ''))}
                                 <br />

                                 <input type="text" name='whatIDoContent' className={(whatIDoData[i]?.whatIDoContent ? 'form-control Blue-combo-border shadow' : (educationError[i]?.whatIDoContent ? 'form-control border-danger shadow' : 'form-control shadow'))} placeholder='whatIDoContent' value={item.whatIDoContent} onChange={(e) => {
                                    setwhatIDoData((prev) => {
                                       const newArr = [...whatIDoData];
                                       newArr[i].whatIDoContent = e.target.value;
                                       return newArr;
                                    })
                                 }} />

                                 {(whatIDoData[i].whatIDoContent ? '' : (educationError[i]?.whatIDoContent ? <p className='text-danger m-0'>{educationError[i].whatIDoContent}</p> : ''))}

                              </div>
                              <div className="card-footer Blue-combo-border shadow">
                                 <small className="text-muted">Your details be safe</small>
                                 <span onClick={() => removeWhatIDoSection(i)} style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }} ><RemoveCircleOutlineIcon className='text-danger' style={{ fontSize: "30px" }} /></span>

                              </div>
                           </div>

                        </div>
                     )
                  })
               }
            </div>
         </div>
      </>
   )
}

export default AdminWhatIDo
