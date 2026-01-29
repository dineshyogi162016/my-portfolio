import React from 'react'
import Signup from '../Components/AdminComponents/AuthComponents/Signup'
import Login from '../Components/AdminComponents/AuthComponents/Login'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/UsersComponents/Home'
import ProtectLoginRoutes from './ProtectedRoutes/ProtectLoginRoutes'
import ProtectLogoutRoutes from './ProtectedRoutes/ProtectLogoutRoutes'
import Dashboard from '../Components/AdminComponents/AuthComponents/Dashboard'
import PageNotFound from '../Components/UsersComponents/PageNotFound'
import ContextState from '../Utilities/ContextAPI/ContextState'
import AdminProfile from '../Components/AdminComponents/AuthComponents/AdminProfile'
import AdminContact from '../Components/AdminComponents/AuthComponents/AdminContact'
import AdminResume from '../Components/AdminComponents/AuthComponents/AdminResume'
import AdminResumeExperience from '../Components/AdminComponents/AuthComponents/AdminResumeExperience'
import AdminWhatIDo from '../Components/AdminComponents/AuthComponents/AdminWhatIDo'

const MainPage = () => {
  
  return (
    <>
      <Routes >

        {/* Not access these pages when user LogOut  */}
         <Route path='/admin' element={<ProtectLoginRoutes Component={Login} />} ></Route>
         <Route path='/signup' element={<ProtectLoginRoutes Component={Signup } />} ></Route>

         {/* Not access these pages when user Login  */}
         <Route path='/admin/dashboard' element={<ProtectLogoutRoutes Component={Dashboard} />} ></Route>
         <Route path='/admin/profile' element={<ProtectLogoutRoutes Component={AdminProfile} />} ></Route>
         <Route path='/admin/contact' element={<ProtectLogoutRoutes Component={AdminContact} />} ></Route>

         <Route path='/admin/resume' element={<ProtectLogoutRoutes Component={AdminResume} />} ></Route>
          <Route path='/admin/resume/education' element={<ProtectLogoutRoutes Component={AdminResume} />} ></Route>
          <Route path='/admin/resume/experience' element={<ProtectLogoutRoutes Component={AdminResumeExperience} />} ></Route>
          <Route path='/admin/whatido' element={<ProtectLogoutRoutes Component={AdminWhatIDo} />} ></Route>


        {/*  /simple User's can Access these pages without login */}
         {/* <Route path='/' element={<Home />} ></Route> */}
         <Route path='/:user' element={<Home />} ></Route>



         {/* <Route path='/contextAPI' element={<ContextState />} ></Route>
         <Route path='/mui' element={<AdminSidebar />} ></Route> */}

         <Route path='/*' element={<Home />} ></Route>

      </Routes>
    </>
  )
}

export default MainPage
