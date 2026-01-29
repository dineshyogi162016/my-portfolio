import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CommonAlert from '../../../Utilities/CommonAlert';
import axios from 'axios';
import { useAuth } from '../../../Utilities/ContextAPI/ContextState';

let API_URL = process.env.REACT_APP_API_URL

const AdminResumeExperience = () => {
   const { LogOutSession } = useAuth()

   const [experienceData, setexperienceData] = useState([
      {
         jobRole: "",
         destination: "",
         startDate: "",
         endDate: "",
         aboutExperience: ""
      }
   ])

   const [experienceError, setexperienceError] = useState([])


   const experienceLength = experienceData.length;

   const addExperieceSection = () => {
      setexperienceData(prevCount => [...prevCount, {
         jobRole: "",
         destination: "",
         startDate: "",
         endDate: "",
         aboutExperience: ""
      }]);

   }

   const removeExperienceSection = (i) => {
      // console.log("Index in remove : ", i)
      if (experienceData.length > 1) {
         const aaaa = experienceData.filter((item, index) => index !== i)
         setexperienceData(aaaa);
      } else {
         CommonAlert("Atleast 1 Experience required", "warning")
      }

   }


   const getsExperienceData = async () => {

      const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin"));
      if (MyPortFolioLogin) {
         const headers = {
            "Content-Type": 'multipart/form-data',
            'Authorization': MyPortFolioLogin.authToken,
            'user': MyPortFolioLogin.user
         };

         const response = await axios.get(`${API_URL}/admin/getExperienceData`, { data: { a: "a" }, headers: headers })

         if (response.data.success) {
            console.log("experiece data : ", response.data)
            if (response.data.response.length > 0) {
               setexperienceData(response.data.response)
            }
         } else if (response.data.expire) {
            LogOutSession()
         }
      }
   }


   const handleAddOrUpdateExperiece = async () => {

      if (validForm()) {

         const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin"));
         if (MyPortFolioLogin) {
            const headers = {
               "Content-Type": 'multipart/form-data',
               'Authorization': MyPortFolioLogin.authToken,
               'user': MyPortFolioLogin.user
            };

            const response = await axios.post(`${API_URL}/admin/addExperienceInResume`, { experience: experienceData, headers: headers })

            if (response.data.success) {
               CommonAlert(response.data.success, "success")
            }
         }

      }

   }


   const validForm = () => {
      let valid = true;

      experienceData.map((item, i) => {

         if (item.jobRole.length === 0) {
            setexperienceError((prev) => {
               let newError = [...prev];
               newError[i] = { ...newError[i], jobRole: "jobRole is required" }
               return newError
            });

            valid = false;
         }

         if (item.destination.length === 0) {
            setexperienceError((prev) => {
               const newError = [...prev];
               newError[i] = { ...newError[i], destination: "destination is required" }
               return newError
            })
            valid = false;
         }

         if (item.startDate.length === 0) {
            setexperienceError((prev) => {
               let newError = [...prev];
               newError[i] = { ...newError[i], startDate: "startDate is required" }
               return newError
            });

            valid = false;
         }

         if (item.endDate.length === 0) {
            setexperienceError((prev) => {
               let newError = [...prev];
               newError[i] = { ...newError[i], endDate: "endDate is required" }
               return newError
            });

            valid = false;
         }

         if (item.aboutExperience.length === 0) {
            setexperienceError((prev) => {
               const newError = [...prev];
               newError[i] = { ...newError[i], aboutExperience: "aboutExperience is required" }
               return newError
            })
            valid = false;
         }



      })

      return valid
   }


   useEffect(() => {
      getsExperienceData()
   }, [])

   return (
      <>
         <div className="">
            {/* <h1>Create Resume </h1>  */}
            <button className="admin-button" onClick={handleAddOrUpdateExperiece} >Add / Edit Experience</button>
            <div className="d-flex flex-wrap justify-content-around row">
               {
                  experienceData.map((item, i) => {
                     return (
                        <div className="col-12 col-xl-4 col-md-6 col-sm-10 " key={i}>

                           <div className="card education-card-admin shadow m-4 Blue-combo-border" >
                              <div className="card-header Blue-combo-border shadow" >
                                 <h5 className="card-title">Education Details <span> {i + 1}</span></h5>
                                 {i === experienceLength - 1 && <span onClick={addExperieceSection} style={{ position: "absolute", top: "0", right: "0", cursor: "pointer" }} ><AddCircleOutlineIcon style={{ fontSize: "30px" }} /></span>}
                              </div>
                              <div className="card-body">
                                 <select name="jobRole" className={(experienceData[i]?.jobRole ? 'form-control Blue-combo-border shadow' : (experienceError[i]?.jobRole ? 'form-control border-danger shadow' : 'form-control shadow'))} onChange={(e) => { setexperienceData((prev) => { const newArr = [...experienceData]; newArr[i].jobRole = e.target.value; return newArr }) }} value={item.jobRole} >
                                    <optgroup>
                                       <option value="" selected disabled>-- JobRole--</option>
                                    </optgroup>
                                    <optgroup>
                                       <option value="Bussiness Man">Bussiness Man</option>
                                       <option value="Manager">Manager</option>
                                       <option value="Employee">Employee</option>
                                       <option value="Fresher">Fresher</option>
                                       <option value="Student">Student</option>
                                    </optgroup>
                                 </select>

                                 {(experienceData[i].jobRole ? '' : (experienceError[i]?.jobRole ? <p className='text-danger m-0'>{experienceError[i].jobRole}</p> : ''))}
                                 <br />

                                 <select name="destination" className={(experienceData[i]?.destination ? 'form-control Blue-combo-border shadow ' : (experienceError[i]?.destination ? 'form-control border-danger shadow' : 'form-control shadow'))} value={item.destination} onChange={(e) => {
                                    setexperienceData((prev) => { const newArr = [...experienceData]; newArr[i].destination = e.target.value; return newArr })
                                 }} defaultValue="" >
                                    <optgroup>
                                       <option value="" selected disabled>-- WorkPlace --</option>
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

                                 {(experienceData[i].destination ? '' : (experienceError[i]?.destination ? <p className='text-danger m-0'>{experienceError[i].destination}</p> : ''))}
                                 <br />

                                 <div className="row">
                                    <div className="startDate col-12 col-lg-6">
                                       <h6 htmlFor="StartDate">Exp. Start</h6>
                                       <input type="date" name='startDate' className={(experienceData[i]?.startDate ? 'form-control Blue-combo-border shadow' : (experienceError[i]?.startDate ? 'form-control border-danger shadow' : 'form-control shadow'))} placeholder='Experience Start startDate' value={item.startDate} onChange={(e) => {
                                          setexperienceData((prev) => {
                                             const newArr = [...experienceData];
                                             newArr[i].startDate = e.target.value;
                                             return newArr;
                                          })
                                       }} />

                                       {(experienceData[i].startDate ? '' : (experienceError[i]?.startDate ? <p className='text-danger m-0'>{experienceError[i].startDate}</p> : ''))}
                                    </div>


                                    <div className="endDate col-12 col-lg-6">
                                       <h6 htmlFor="endDate">Exp. End</h6>
                                       <input type="date" name='endDate' className={(experienceData[i]?.endDate ? 'form-control Blue-combo-border shadow' : (experienceError[i]?.endDate ? 'form-control border-danger shadow' : 'form-control shadow'))} placeholder='Experience Start endDate' value={item.endDate} onChange={(e) => {
                                          setexperienceData((prev) => {
                                             const newArr = [...experienceData];
                                             newArr[i].endDate = e.target.value;
                                             return newArr;
                                          })
                                       }} />

                                       {(experienceData[i].endDate ? '' : (experienceError[i]?.endDate ? <p className='text-danger m-0'>{experienceError[i].endDate}</p> : ''))}
                                    </div>
                                 </div>

                                 <br />

                                 <textarea type="text" name='aboutExperience' className={(experienceData[i]?.aboutExperience ? 'form-control Blue-combo-border shadow' : (experienceError[i]?.aboutExperience ? 'form-control border-danger shadow' : 'form-control shadow'))} placeholder='About Experience...' value={item.aboutExperience} onChange={(e) => {
                                    setexperienceData((prev) => {
                                       const newArr = [...experienceData];
                                       newArr[i].aboutExperience = e.target.value;
                                       return newArr;
                                    })
                                 }} />

                                 {(experienceData[i].aboutExperience ? '' : (experienceError[i]?.aboutExperience ? <p className='text-danger m-0'>{experienceError[i].aboutExperience}</p> : ''))}

                              </div>
                              <div className="card-footer Blue-combo-border shadow">
                                 <small className="text-muted">Your details be safe</small>
                                 <span onClick={() => removeExperienceSection(i)} style={{ position: "absolute", bottom: "0", right: "0", cursor: "pointer" }} ><RemoveCircleOutlineIcon className='text-danger' style={{ fontSize: "30px" }} /></span>

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

export default AdminResumeExperience
