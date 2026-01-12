import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CommonAlert from '../../../Utilities/CommonAlert';
import axios from 'axios';
import { useAuth } from '../../../Utilities/ContextAPI/ContextState';

let API_URL = process.env.REACT_APP_API_URL

const AdminResume = () => {

   const { LogOutSession } = useAuth()

   const [educationData, seteducationData] = useState([
      {
         educationType: "",
         educationName: "",
         marks: "",
         passingYear: ""
      }
   ])

   const [educationError, seteducationError] = useState([])

   const educatoinLength = educationData.length;
   // console.log("educatoinLength : ", educatoinLength )
   // console.log("ERrorrr : ", educationError )

   const addEducationSection = () => {
      seteducationData(prevCount => [...prevCount, {
         educationType: "",
         educationName: "",
         marks: "",
         passingYear: ""
      }]);

   }


   const removeEducationSection = (i) => {
      // console.log("Index in remove : ", i)
      if (educationData.length > 1) {
         let aaaa = educationData.filter((item, index) => index !== i)
         seteducationData(aaaa);
      } else {
         CommonAlert("Atleast 1 education required", "warning")
      }

   }


   // const handleChangeEducation = (e, i) => {
   //    // seteducationData([...educationData, {...educationCount[i] ,[e.target.name]: e.target.value ]})

   //    seteducationData((prevData) => 
   //       prevData.map((item, index) => 
   //          index === i ? { ...item, [e.target.name]: e.target.value } : item
   //       )   
   //    )
   // }

   const getsEducationData = async () => {

      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin"));
      if (MyPortFolioLogin) {
         const headers = {
            "Content-Type": 'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken,
            'user': MyPortFolioLogin.user
         };

         const response = await axios.get(`${API_URL}/admin/getEducationData`, { data: { a: "a" }, headers: headers })

         if (response.data.success) {
            if (response.data.response.length > 0) {
               seteducationData(response.data.response)
            }
         } else if (response.data.expire) {
            LogOutSession()
         }
      }
   }


   const handleAddOrUpdateEducation = async () => {

      if (validForm()) {
         const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin"));
         if (MyPortFolioLogin) {
            const headers = {
               "Content-Type": 'multipart/form-data',
               'Authorization': MyPortFolioLogin.authToken,
               'user': MyPortFolioLogin.user
            };

            const response = await axios.post(`${API_URL}/admin/addEducationInResume`, { education: educationData, headers: headers })

            if (response.data.success) {
               CommonAlert(response.data.success, "success")
            }
         }
      }

   }


   const validForm = () => {
      let valid = true;

      educationData.map((item, i) => {

         if (item.educationType.length === 0) {
            seteducationError((prev) => {
               let newError = [...prev];
               newError[i] = { ...newError[i], educationType: "EducationType is required" }
               return newError
            });

            valid = false;
         }

         if (item.educationName.length === 0) {
            seteducationError((prev) => {
               const newError = [...prev];
               newError[i] = { ...newError[i], educationName: "EducationName is required" }
               return newError
            })
            valid = false;
         }

         if (item.marks.length === 0) {
            seteducationError((prev) => {
               let newError = [...prev];
               newError[i] = { ...newError[i], marks: "marks is required" }
               return newError
            });

            valid = false;
         }

         if (item.passingYear.length === 0) {
            seteducationError((prev) => {
               const newError = [...prev];
               newError[i] = { ...newError[i], passingYear: "PassingYear is required" }
               return newError
            })
            valid = false;
         }



      })

      return valid
   }


   useEffect(() => {
      getsEducationData()
   }, [])
   return (
      <>
         <div className="">
            {/* <h1>Create Resume </h1>  */}
            <button className="admin-button" onClick={handleAddOrUpdateEducation} >Add / Edit Education</button>
            <div className="d-flex flex-wrap justify-content-around row">
               {
                  educationData.map((item, i) => {
                     return (
                        <div className="col-12 col-xl-4 col-md-6 col-sm-10 " key={i}>

                           <div className="card education-card-admin shadow m-4 Blue-combo-border"  >
                              <div className="card-header Blue-combo-border shadow" >
                                 <h5 className="card-title">Education Details <span> {i + 1}</span></h5>
                                 {i === educatoinLength - 1 && <span onClick={addEducationSection} style={{ position: "absolute", top: "0", right: "0", cursor: "pointer" }} ><AddCircleOutlineIcon style={{ fontSize: "30px" }} /></span>}
                              </div>
                              <div className="card-body">
                                 <select name="educationType" className={(educationData[i]?.educationType ? 'form-control Blue-combo-border shadow' : (educationError[i]?.educationType ? 'form-control border-danger shadow' : 'form-control shadow'))} onChange={(e) => { seteducationData((prev) => { const newArr = [...educationData]; newArr[i].educationType = e.target.value; return newArr }) }} value={item.educationType} >
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

                                 {(educationData[i].educationType ? '' : (educationError[i]?.educationType ? <p className='text-danger m-0'>{educationError[i].educationType}</p> : ''))}
                                 <br />

                                 <select name="educationName" className={(educationData[i]?.educationName ? 'form-control Blue-combo-border shadow ' : (educationError[i]?.educationName ? 'form-control border-danger shadow' : 'form-control shadow'))} value={item.educationName} onChange={(e) => {
                                    seteducationData((prev) => { const newArr = [...educationData]; newArr[i].educationName = e.target.value; return newArr })
                                 }} defaultValue="" >
                                    <optgroup>
                                       <option value="" selected disabled>--Education Name--</option>
                                    </optgroup>
                                    <optgroup>
                                       <option value="8th">8th</option>
                                       <option value="10th">10th</option>
                                       <option value="12th">12th</option>
                                    </optgroup>
                                    <optgroup>
                                       <option value="BA.">BA.</option>
                                       <option value="BCOM.">BCOM.</option>
                                       <option value="BSC.">BSC.</option>
                                       <option value="BTECH.">BTECH.</option>
                                       <option value="BCA.">BCA.</option>
                                    </optgroup>
                                 </select>

                                 {(educationData[i].educationName ? '' : (educationError[i]?.educationName ? <p className='text-danger m-0'>{educationError[i].educationName}</p> : ''))}
                                 <br />

                                 <input type="text" name='passingYear' className={(educationData[i]?.passingYear ? 'form-control Blue-combo-border shadow' : (educationError[i]?.passingYear ? 'form-control border-danger shadow' : 'form-control shadow'))} placeholder='Passing year' value={item.passingYear} onChange={(e) => {
                                    seteducationData((prev) => {
                                       const newArr = [...educationData];
                                       newArr[i].passingYear = e.target.value;
                                       return newArr;
                                    })
                                 }} />

                                 {(educationData[i].passingYear ? '' : (educationError[i]?.passingYear ? <p className='text-danger m-0'>{educationError[i].passingYear}</p> : ''))}
                                 <br />

                                 <input type="text" name='marks' className={(educationData[i]?.marks ? 'form-control Blue-combo-border shadow' : (educationError[i]?.marks ? 'form-control border-danger shadow' : 'form-control shadow'))} placeholder='Marks' value={item.marks} onChange={(e) => {
                                    seteducationData((prev) => {
                                       const newArr = [...educationData];
                                       newArr[i].marks = e.target.value;
                                       return newArr;
                                    })
                                 }} />

                                 {(educationData[i].marks ? '' : (educationError[i]?.marks ? <p className='text-danger m-0'>{educationError[i].marks}</p> : ''))}

                              </div>
                              <div className="card-footer Blue-combo-border shadow">
                                 <small className="text-muted">Your details be safe</small>
                                 <span onClick={() => removeEducationSection(i)} style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }} ><RemoveCircleOutlineIcon className='text-danger' style={{ fontSize: "30px" }} /></span>

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

export default AdminResume
