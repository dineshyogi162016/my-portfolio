import React from 'react'
import ContactForm from './ContactForm'
import UserNavigation from './UserNavigation'
import UserFooter from './UserFooter'
import { useAuth } from '../../Utilities/ContextAPI/ContextState'
import EducationDetails from './EducationDetails'
import WhatIDo from './WhatIDo'
import AboutMe from './AboutMe'
import ExperienceDetails from './ExperienceDetails'

const Home = () => {
  const { ParamsforHome } = useAuth()
  return (
    <>
      <UserNavigation />
      {/* <h1>Home User's Page</h1>
      <h3>{ParamsforHome}</h3> */}

      <div className="fullWidth bg-dark text-light p-5">
        <AboutMe />
      </div>

      <div className="fullWidth bg-dark text-light p-5">
        <WhatIDo />
      </div>

      <div className="fullWidth bg-dark p-5">
        <div className="heading-section text-light">
          <h1>Resume</h1>
        </div> <hr />
        <EducationDetails />
      </div>

      <div className="fullWidth bg-dark p-5">
        <ExperienceDetails />
      </div>

      <div className="fullWidth bg-dark p-5">
        <ContactForm />
      </div>
      {/* <hr /> */}
      <UserFooter />
    </>
  )
}

export default Home
