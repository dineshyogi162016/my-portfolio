import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../../../Utilities/ContextAPI/ContextState';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import CommonAlert from '../../../Utilities/CommonAlert';
import { useState } from 'react';

let API_URL = process.env.REACT_APP_API_URL

const AdminNavbar = (props) => {
  const Navigate = useNavigate()

  // use Context using 
  const {LogOutSession} = useAuth()

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profileData, setprofileData] = useState(null)

  const {SidebarTogel, setSidebarTogel} = props;

  console.log("navbar : Called", profileData )

  const handleTogelSidebar = () => {
   setSidebarTogel(!SidebarTogel)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  // Log Out function 
  const hadleLogOut = () => {
    // use for menu close 
    handleCloseUserMenu()

    // Use context logout function 
    LogOutSession()
  }

  const handleGetProfile = async() => {
    const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
    if(MyPortFolioLogin){
       const headers = {
          " Content-Type":'multipart/form-data',
          'Authorization': MyPortFolioLogin.authToken, 
          'user': MyPortFolioLogin.user
       };

       try {
           const result =await axios.get(`${API_URL}/admin/profile/getProfile`, {headers});
   
           if(result.data.response.adminProfile){
               const imageUrl = result.data.response.adminProfile.profileImage
               const User = result.data.response.user
               const UserName = result.data.response.adminProfile.userName
   
               setprofileData({
                   profileImage : imageUrl,
                   user : User,
                   userName : UserName
               })
           }
   
   
       } catch (error) {
           CommonAlert("Something went wrong", "warning")
       }

    }
       
  }

  useEffect(() => {
    handleGetProfile()
 },[])
  return (
    <AppBar position="static" className=' Blue-liniar-background'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <img src={require("../../../Utilities/Images/PortfolioLogo.png")} alt="Logo" width={150} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <MenuIcon  size="large" onClick={handleTogelSidebar} />
            {/* <img src={require("../../../Utilities/Images/PortfolioLogo1.png")} alt="Logo" width={35} /> */}
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
              <h5 className='mb-1' onClick={()=>{Navigate("/admin/dashboard")}} style={{cursor:"pointer"}} >Dashboard</h5>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <span className='mr-2 font-weight-bold'>Welcome, {JSON.parse(localStorage.getItem("MyPortfolioLogin")).userName} </span>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar  src="../../../Utilities/Images/PortfolioLogo1.png" alt="Remy Sharp" /> */}

                <img src={(profileData?`../../uploads/${profileData.profileImage}` : '../uploads/PortfolioLogo1.png')} alt="Logo" width={40} height={40} className='admin-nav-Avtar' />

              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px', padding: "10px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top', horizontal: 'right', }}keepMountedtransformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}  >

               <MenuItem key={"profile"} onClick={handleCloseUserMenu} className='admin-menu-items bg-white-col-blue'>
                  <Typography textAlign="center">Profile</Typography>
               </MenuItem>
               <MenuItem key={"profile"} onClick={hadleLogOut} className='admin-menu-items bg-white-col-blue'>
                  <Typography textAlign="center"><strong>Log Out</strong></Typography>
               </MenuItem>

            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AdminNavbar;