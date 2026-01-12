const express = require("express");
const Router = express.Router();

const { postMessage, getResumeData, getWhatIDo } = require("../Controller/UserController/AllUserControlls")


// Resume Api's 
Router.get('/getExperienceData', getResumeData);
Router.get('/getEducationData', getResumeData);


// Contact us Api's 
Router.post('/contactus/:user', postMessage);


// What i do Api's
Router.get('/getWhatIDoing', getWhatIDo)
Router.get('/getWhatIDid', getWhatIDo)

module.exports = Router;