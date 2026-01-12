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


const ExperienceDetails = () => {

   const {handleGetProfile, ParamsforHome} = useAuth()

   const [experienceData, setexperienceData] = useState([])

   const getsEducationData = async () => {
         const headers = {
            'user': ParamsforHome
         };

         const response = await axios.get(`${API_URL}/user/getExperienceData`, {headers : headers})

         if(response.data.success){
            setexperienceData(response.data.response)
         }
   }

   console.log("experienceData : ", experienceData)

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
         <h2>Experience</h2>
      </div>
      <div className="experience-all-cards mt-4 row" >
         {/* <Slider {...settings} > */}
         {/* <div className="education-card d-flex py-5 " style={{width: "450px"}}>
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
         </div> */}

         {experienceData && experienceData.map((e, i)=> {
            return(
               <div className="experiece-card text-light text-left col col-lg-6 col-12 " key={i} >
                  <div className="experiece-card-title">
                     <span className='counting mr-4' >{i+1}</span>
                     <span>{experienceData[i].startDate} - {experienceData[i].endDate}</span>
                  </div>
                  <div className="experiece-card-content border-left" style={{overflow: "hidden"}}>
                     <h5 className="font-weight-bold">{experienceData[i].jobRole} </h5>
                     <p className="primary-color">{experienceData[i].destination}</p>
                     <p className="aboutExperience grey-white">{experienceData[i].aboutExperience}</p>
                  </div>
               </div>
            )
         })}

         {/* </Slider> */}
      </div>
    </div>
  )
}

export default ExperienceDetails
