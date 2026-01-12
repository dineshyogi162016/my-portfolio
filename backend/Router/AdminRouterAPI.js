const express = require("express")
const Router = express.Router()

const {profilePost, getProfile} = require("../Controller/AdminController/ProfileAPI's")
const {Signup, Login, Logout, checkLogin} = require("../Controller/AdminController/AuthSystem")
const {getEducationData, addDataInResume} = require("../Controller/AdminController/ResumeAPI's")
const {getContactUs, deleteMessage, readMessage, unReadMessage} = require("../Controller/AdminController/ContactAPI's")
const {addWhatIDo, getWhatIDo} = require("../Controller/AdminController/WhatIDo")

const UserVarifier = require("../Middleware/UserVarifier")
const upload = require("../Middleware/Uploads")

// AuthSystem's API  
Router.post("/signup", Signup)
Router.post("/login", Login)
Router.put("/logout", Logout)
Router.get("/checklogin", UserVarifier, checkLogin )

// Profile's API's 
Router.post("/profile/profilepost", UserVarifier, upload.single('profileImage') , profilePost )
Router.get("/profile/getProfile", getProfile )

// Resume Admin's Api
Router.post('/addEducationInResume', UserVarifier , addDataInResume )
Router.get('/getEducationData', UserVarifier, getEducationData )

Router.post('/addExperienceInResume', UserVarifier , addDataInResume )
Router.get('/getExperienceData', UserVarifier, getEducationData )


// What I do Api's 
Router.post('/addWhatIDoing', addWhatIDo )
Router.get('/getWhatIDoing', getWhatIDo )


// Contact us Api's 
Router.get('/profile/getContactUs', getContactUs)
Router.delete('/contactus/deleteMassage/:_id', deleteMessage)
Router.put('/contactus/readMassage/:_id', readMessage)
Router.put('/contactus/unReadMassage/:_id', unReadMessage)

module.exports = Router