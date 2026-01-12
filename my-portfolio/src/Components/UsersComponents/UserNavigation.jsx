import React from 'react'
import { Link } from 'react-router-dom'

const UserNavigation = () => {
  return (
    <>
      <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
         <div className='container' >
            <Link className="navbar-brand" href="#">Porfolio</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
               <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

               </ul>
               <div className="form-inline my-2 my-lg-0">
                  <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                     <li className="nav-item ">
                     <Link className="nav-link" href="/"><strong>Home</strong> <span className="sr-only"></span></Link>
                     </li>
                     
                     <li className="nav-item ">
                     <Link className="nav-link" href="/"><strong>Services</strong> <span className="sr-only"></span></Link>
                     </li>
                     <li className="nav-item ">
                     <Link className="nav-link" href="/"><strong>Education</strong> <span className="sr-only"></span></Link>
                     </li>
                     <li className="nav-item ">
                     <Link className="nav-link" href="/"><strong>Experience</strong> <span className="sr-only"></span></Link>
                     </li>

                     <li className="nav-item ">
                     <Link className="nav-link" href="/"><strong>Contact Us</strong><span className="sr-only"></span></Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
    </>
  )
}

export default UserNavigation
