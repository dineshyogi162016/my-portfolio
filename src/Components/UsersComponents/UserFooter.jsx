import React from 'react'
import { Link } from 'react-router-dom'

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const UserFooter = () => {
  return (
    <>
      <div className=" text-light bg-dark ">
         <div className='container mx-auto row py-3' >
            <div className="footer-left col col-xl-6 col-sm-6 col-12 text-left">
               <Link className="text-light" href="/">© Copyright 2023 - by Hawkscode</Link>
            </div>
            <div className="footer-right col col-xl-6 col-sm-6 col-12 text-right">
               <Link className="text-light mx-2 " href="/facebook.com"><FacebookOutlinedIcon /> </Link>
               <Link className="text-light mx-2 " href="/whatsapp.com"><WhatsAppIcon /> </Link>
               <Link className="text-light mx-2 " href="/instagram.com"><InstagramIcon /> </Link>
               <Link className="text-light mx-2 " href="/linkedin.com"><LinkedInIcon /> </Link>
            </div>
         </div>
      </div>      
    </>
  )
}

export default UserFooter
