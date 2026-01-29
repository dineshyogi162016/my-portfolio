import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext , useContext } from 'react';
import CommonAlert from '../CommonAlert';
import { useLocation, useNavigate } from 'react-router-dom';
const AuthContext = createContext();

let API_URL = process.env.REACT_APP_API_URL

export const useAuth = () => {
    return useContext(AuthContext);
};


const AuthProvider  = ({children}) => {
    let navigate = useNavigate()
    
    const [profileData, setprofileData] = useState(null)

    const [logOut, setlogOut] = useState({
        logout : "Dumy Logout data"
    })
     
    const [ParamsforHome, setParamsforHome] = useState("Danish@gmail.com")

    const { pathname} = useLocation();
    const pathArray = pathname.split("/")

    
    const logOutData = {
        authToken : "",
        warning : "You are now LogOut"
    }


    const LogOutSession = async ()=> {
        const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin"))
        if(MyPortFolioLogin){
           
           const headers = {
              'Content-Type': 'application/json',
              'user': MyPortFolioLogin.user
           };
           
           let response = await axios.put(`${API_URL}/admin/logout`, logOut , {headers})
           
           if(response.data.success){
              CommonAlert("Session Expired", "error")
              localStorage.setItem("MyPortfolioLogin", JSON.stringify(logOutData))
              navigate("/admin")
              
           }else if (response.data.warning){
            //   CommonAlert(response.data.warning, "warning")
           }
           
        }
    }


    const checkLoginOrNot = async() => {

        const MyPortFolioLogin = JSON.parse(localStorage.getItem("MyPortfolioLogin")) ;
        if(MyPortFolioLogin){
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': MyPortFolioLogin.authToken, 
                'user': MyPortFolioLogin.user
            };

            const response = await axios.get(`${API_URL}/admin/checklogin`, {headers})

            if(response.data.expire || response.data.error){
                CommonAlert("Session Expired", "error")
                localStorage.setItem("MyPortfolioLogin", JSON.stringify(logOutData))
                navigate("/admin")
            }
        }
    }

    // console.log("params for home : ", ParamsforHome )
    
   const handleGetProfile = async () => {
    
    const headers = {
        'user': ParamsforHome
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


    // useEffect(() => {
    //     if(pathArray[1]){
    //         setParamsforHome(pathArray[1])
    //     }else{
    //         setParamsforHome('Danish@gmail.com')
    //     }

    // },[ParamsforHome])

    useEffect(()=> {
        if(pathArray[1]){
            setParamsforHome(pathArray[1])
        }else{
            setParamsforHome('Danish@gmail.com')
        }

        handleGetProfile()
    },[])
    return ( 
        <AuthContext.Provider value={{ LogOutSession, checkLoginOrNot, profileData, handleGetProfile, ParamsforHome }}>
            {children}
        </AuthContext.Provider>
    )
    
 
}
export default AuthProvider
