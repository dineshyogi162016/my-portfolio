import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';

import PreviewIcon from '@mui/icons-material/Preview';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { MdArrowForwardIos } from "react-icons/md";

const AdminSidebar = () => {
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const DrawerList = (
   //  <Box sx={{ width: 250 }} role="presentation" className='' >
   //    <List>
   //      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
   //        <ListItem key={text} disablePadding>
   //          <ListItemButton>
   //            <ListItemIcon>
   //              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
   //            </ListItemIcon>
   //            <ListItemText primary={text} />
   //          </ListItemButton>
   //        </ListItem>
   //      ))}
   //    </List>
   //    <Divider />
   //    <List>
   //      {['All mail', 'Trash', 'Spam'].map((text, index) => (
   //        <ListItem key={text} disablePadding>
   //          <ListItemButton>
   //            <ListItemIcon>
   //              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
   //            </ListItemIcon>
   //            <ListItemText primary={text} />
   //          </ListItemButton>
   //        </ListItem>
   //      ))}
   //    </List>
   //  </Box>
//   );

  return (
   <>
      <Box sx={{ width: 250 }} role="presentation" className='Self-Sidebar ' >
         <List>
            <ListItem key={"dashboard"} disablePadding>
               <NavLink to={"/admin/dashboard"} className='admin-menu-items bg-white-col-blue w-100' >
                  <ListItemButton>
                     <ListItemIcon>
                        <DashboardIcon className='blue-color-combo' />
                     </ListItemIcon>
                     <ListItemText >
                        <strong>Dashboard</strong>
                     </ListItemText>
                  </ListItemButton> 
               </NavLink>
            </ListItem>

            <ListItem key={"Admin"} disablePadding>
               <NavLink to={"/admin/admin"} className='admin-menu-items bg-white-col-blue w-100' >
                  <ListItemButton>
                     <ListItemIcon >
                        <AdminPanelSettingsIcon className='blue-color-combo' />
                     </ListItemIcon>
                     <ListItemText >
                        <strong>Admin</strong>
                     </ListItemText>
                  </ListItemButton> 
               </NavLink>
            </ListItem>

            <ListItem key={"User"} disablePadding>
               <NavLink to={"/admin/user"} className='admin-menu-items bg-white-col-blue w-100' >
                  <ListItemButton>
                     <ListItemIcon >
                        <AccountBoxIcon className='blue-color-combo' />
                     </ListItemIcon>
                     <ListItemText >
                        <strong>User</strong>
                     </ListItemText>
                  </ListItemButton> 
               </NavLink>
            </ListItem>
         </List>

         <Divider />
         
         <List>
            <ListItem key={"Resume"} className='navbar-resume' disablePadding >
               <NavLink to={"/admin/Resume"} className='admin-menu-items bg-white-col-blue w-100' >
                  <ListItemButton>
                     <ListItemIcon>
                        <PreviewIcon className='blue-color-combo' />
                     </ListItemIcon>
                     <ListItemText >
                        <strong>Resume</strong> <span className='sub-nav-arrow-icon' style={{position: "absolute", right: "10px"}} ><MdArrowForwardIos /> </span> 
                     </ListItemText>
                  </ListItemButton> 
               </NavLink>
               <List className='resume-sub-nav shadow leftToRightSub' sx={{ width: 250 }} >
                  <ListItem key={"education"} disablePadding>
                     <NavLink to={"/admin/resume/education"} className='admin-menu-items bg-white-col-blue w-100' >
                        <ListItemButton>
                           <ListItemIcon>
                              <PreviewIcon className='blue-color-combo' />
                           </ListItemIcon>
                           <ListItemText >
                              <strong>Education</strong>
                           </ListItemText>
                        </ListItemButton> 
                     </NavLink>
                  </ListItem >
                  
                  <ListItem key={"education"} disablePadding>
                     <NavLink to={"/admin/resume/experience"} className='admin-menu-items bg-white-col-blue w-100' >
                        <ListItemButton>
                           <ListItemIcon>
                              <PreviewIcon className='blue-color-combo' />
                           </ListItemIcon>
                           <ListItemText >
                              <strong>Experience</strong>
                           </ListItemText>
                        </ListItemButton> 
                     </NavLink>
                  </ListItem >

               </List>
            </ListItem>

            <ListItem key={"whatIDo"} disablePadding>
               <NavLink to={"/admin/whatido"} className='admin-menu-items bg-white-col-blue w-100' >
                  <ListItemButton>
                     <ListItemIcon>
                        <AccountBoxIcon className='blue-color-combo' />
                     </ListItemIcon>
                     <ListItemText >
                        <strong>What i do</strong>
                     </ListItemText>
                  </ListItemButton> 
               </NavLink>
            </ListItem>

            <ListItem key={"Profile"} disablePadding>
               <NavLink to={"/admin/profile"} className='admin-menu-items bg-white-col-blue w-100' >
                  <ListItemButton>
                     <ListItemIcon>
                        <AccountBoxIcon className='blue-color-combo' />
                     </ListItemIcon>
                     <ListItemText >
                        <strong>Profile</strong>
                     </ListItemText>
                  </ListItemButton> 
               </NavLink>
            </ListItem>

            <ListItem key={"ContactUs"} disablePadding>
               <NavLink to={"/admin/contact"} className='admin-menu-items bg-white-col-blue w-100' >
                  <ListItemButton>
                     <ListItemIcon>
                        <WhatsAppIcon className='blue-color-combo' />
                     </ListItemIcon>
                     <ListItemText >
                        <strong>Contact Us</strong>
                     </ListItemText>
                  </ListItemButton> 
               </NavLink>
            </ListItem>    
         </List>
      </Box>
   </>
  );
}

export default AdminSidebar