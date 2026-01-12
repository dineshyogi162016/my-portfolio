import React, { useEffect, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../Utilities/ContextAPI/ContextState';
import axios from 'axios';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let API_URL = process.env.REACT_APP_API_URL


const EducationDetails = () => {

   const {handleGetProfile, profileData, ParamsforHome} = useAuth()

   const [educationData, seteducationData] = useState([])

   const getsEducationData = async () => {
         const headers = {
            'user': ParamsforHome
         };

         const response = await axios.get(`${API_URL}/user/getEducationData`, {headers : headers})

         if(response.data.success){
            seteducationData(response.data.response)
         }
   }


   var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    };

   useEffect(()=> {
      handleGetProfile()
      getsEducationData()
   },[])
  return (
    <div className='container'>
      <div className="heading-section text-light">
         <h2 >Education</h2>
      </div>
      <div className="education-all-cards mt-4" >
         <Slider {...settings} >
         <div className="education-card d-flex py-5 " style={{width: "450px"}}>
            <div className="col col-4 d-flex justify-content-center align-items-center" >
               <div className="card-image">
                  <img src={profileData?`./uploads/${profileData.profileImage}` : "../uploads/profileUploadThumbnail.png"} alt="User Image" />
               </div>
            </div>
            <div className="card-content card-body col col-8 text-right" style={{overflow: "hidden"}}>
               <h4 className="card-title">{profileData? profileData.userName : "Danish" } <span className='card-icon'><ArrowBackIcon /> <PersonOutlineIcon /></span> </h4>
               <h6 className="card-title mt-4">{profileData? profileData.user : "Danish@gmail.com" }<span className='card-icon'><ArrowBackIcon /> <MailOutlineIcon /></span></h6>
               <p className="card-title mt-4">Jagatpura, jaipur, rajsthan<span className='card-icon'><ArrowBackIcon /> <AccountBalanceIcon /></span> </p>
            </div>
         </div>

         {educationData && educationData.map((e, i)=> {
            return(
               <div className="education-card d-flex py-5 " key={i} style={{width: "450px"}}>
                  <div className="col col-4 d-flex justify-content-center align-items-center" >
                     <div className="education-details">
                        <h1>{i+1}</h1>
                        <p>Education</p>
                     </div>
                  </div>
                  <div className="card-content card-body col col-8 text-right" style={{overflow: "hidden"}}>
                     <h6 className="card-title">{e.educationName} <span className='card-icon'><ArrowBackIcon /> Degree</span> </h6>
                     <p className="card-title ">{e.educationType}<span className='card-icon'><ArrowBackIcon /> Type</span></p>
                     <p className="card-title ">{e.marks} % <span className='card-icon'><ArrowBackIcon /> Marks </span> </p>
                     <p className="card-title ">{e.passingYear}<span className='card-icon'><ArrowBackIcon /> Pass Year</span> </p>
                  </div>
               </div>
            )
         })}

         </Slider>
      </div>
    </div>
  )
}

export default EducationDetails
