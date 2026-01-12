import React from 'react'
import { FaReact, FaTools } from "react-icons/fa";
import { IoCameraReverseOutline } from "react-icons/io5";

const WhatIDo = () => {
  return (
    <>
      <div className="whatIDo container">
         <div className="heading-section text-light mb-5">
            <h1 >What I Do</h1>
         </div>
         <div className="row  mt-5" >
            <div className="content-box col-lg-4 col-md-6 col-sm-12 col-12 my-2 px-2 border-left">
               <div className="px-4 py-3 text-left">
                  <h1><FaReact style={{color: "rgb(207, 31, 31)"}} /> <span style={{fontSize: "30px"}}>Branding</span></h1>
                  <p className='mt-4 grey-white'>Ex velit cupidatat magna voluptate deserunt quis et dolor adipisicing elit culpa ad exercitation proident irure deserunt irure.</p>
               </div>
            </div>
            
            <div className=" content-box col-lg-4 col-md-6 col-sm-12 col-12 my-2  px-2 border-left">
               <div className="px-4 py-3 text-left">
                  <h1><FaTools style={{color: "rgb(207, 31, 31)"}} /> <span style={{fontSize: "30px" }}> Develoment </span></h1>
                  <p className='mt-4 grey-white'>Ex velit cupidatat magna voluptate deserunt quis et dolor adipisicing elit culpa ad exercitation proident irure deserunt irure.</p>
               </div>
            </div>
            
            <div className="content-box col-lg-4 col-md-6 col-sm-12 col-12 border-left" style={{borderColor: "#ffffff75"}} >
               <div className="px-4 py-3 text-left">
                  <h1><IoCameraReverseOutline style={{color: "rgb(207, 31, 31)"}} /> <span style={{fontSize: "30px"}}>PhotoGraphy</span></h1>
                  <p className='mt-4 grey-white'>Ex velit cupidatat magna voluptate deserunt quis et dolor adipisicing elit ad exercitation proident irure deserunt irure.</p>
               </div>
            </div>
            

            
         </div>
      </div>
    </>
  )
}

export default WhatIDo
