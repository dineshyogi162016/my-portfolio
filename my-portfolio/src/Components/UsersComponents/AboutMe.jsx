import React from 'react'

const AboutMe = () => {
  return (
    <>
      <div className="about-me container mx-auto p-0 about-section row">
         <div className="col-12 p-0 col-lg-6">
            <img src={require("../../Utilities/Images/about-me.png")} alt="" className='img-fluid' />
         </div>
         <div className=" text-light mt-5 p-0 col-12 col-lg-6 text-left">
            <h1>About me</h1>
            <p className='grey-white' >In quis amet ex veniam in irure est culpa veniam velit fugiat cupidatat duis anim commodo elit in occaecat cupidatat eu et sunt commodo voluptate ullamco magna nulla amet. Lorem ipsum officia veniam enim sit culpa velit proident enim ea officia aute non in mollit culpa anim magna sit veniam irure eiusmod.</p>
            
            <div className="skills">
               <div className="skill" >
                  <p className='mt-4 mb-2'>HTML</p>
                  <span className='skill-percent' style={{left: "75%"}} >80%</span>
                  <div class="progress " style={{height: "6px", backgroundColor: "rgb(48 48 48)"}}>
                     <div class="progress-bar bg-info" role="progressbar" style={{width: "80%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                     </div>
                  </div>
               </div>
               
               <div className="skill" >
                  <p className='mt-4 mb-2'>HTML</p>
                  <span className='skill-percent' style={{left: "55%"}} >60%</span>
                  <div class="progress " style={{height: "6px", backgroundColor: "rgb(48 48 48)"}}>
                     <div class="progress-bar bg-info" role="progressbar" style={{width: "60%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                     </div>
                  </div>
               </div>

               <div className="skill" >
                  <p className='mt-4 mb-2'>HTML</p>
                  <span className='skill-percent' style={{left: "40%"}}>45%</span>
                  <div class="progress " style={{height: "6px", backgroundColor: "rgb(48 48 48)"}}>
                     <div class="progress-bar bg-info" role="progressbar" style={{width: "45%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                     </div>
                  </div>
               </div>

               <div className="skill" >
                  <p className='mt-4 mb-2'>HTML</p>
                  <span className='skill-percent' style={{left: "65%"}}>70%</span>
                  <div class="progress " style={{height: "6px", backgroundColor: "rgb(48 48 48)"}}>
                     <div class="progress-bar bg-info" role="progressbar" style={{width: "70%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                     </div>
                  </div>
               </div>

               <div className="skill" >
                  <p className='mt-4 mb-2'>HTML</p>
                  <span className='skill-percent' style={{left: "55%"}} >60%</span>
                  <div class="progress " style={{height: "6px", backgroundColor: "rgb(48 48 48)"}}>
                     <div class="progress-bar bg-info" role="progressbar" style={{width: "60%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </>
  )
}

export default AboutMe
