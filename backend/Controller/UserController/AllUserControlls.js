const ContactSchema = require("../../Models/ContactSchema")
const ResumeSchema = require("../../Models/ResumeSchema")
const WhatIDoSchema = require("../../Models/WhatIDoSchema")

// Resume Data 
const postMessage = async (req, res) => {
   const { name, email, phone, message } = req.body
   const { user } = req.params

   console.log("user : ", user)

   const contactInstance = new ContactSchema({
      user: user,
      contactData: {
         name: name,
         email: email,
         phone: phone,
         message: message,
         read: false
      }
   })

   try {

      const response = await contactInstance.save()

      if (response) {
         res.json({
            status: 201,
            success: "Message was sent"
         })
      } else {
         res.json({
            warning: "Something wrong"
         })
      }

   } catch (error) {
      res.json({
         warning: "Something went wrong"
      })
   }

}

const getResumeData = async (req, res) => {
   const user = req.headers.user

   try {

      const response = await ResumeSchema.find({ user: user })

      if (req.originalUrl === "/user/getExperienceData") {
         if (response && response.length > 0 && response[0].resumeData) {
            res.json({
               success: "SuccessFully Get data",
               response: response[0].resumeData.experience || []
            })
         } else {
            res.json({
               success: "SuccessFully Get data",
               response: []
            })
         }

      } else if (req.originalUrl === "/user/getEducationData") {
         if (response && response.length > 0 && response[0].resumeData) {
            res.json({
               success: "SuccessFully Get data",
               response: response[0].resumeData.education || []
            })
         } else {
            res.json({
               success: "SuccessFully Get data",
               response: []
            })
         }
      }

   } catch (error) {
      res.json({ warning: "Something went wrong" })
   }
}

// What i do 
const getWhatIDo = async (req, res) => {
   const user = req.headers.user
   try {

      const response = await WhatIDoSchema.find({ user: user })
      if (response && response.length > 0 && response[0].whatWeDo) {
         if (req.originalUrl === "/user/getWhatIDoing") {
            res.json({
               success: "SuccessFully Get data",
               response: response[0].whatWeDo.whatIDoing || []
            })
         } else if (req.originalUrl === "/user/getWhatIDid") {
            res.json({
               success: "SuccessFully Get data",
               response: response[0].whatWeDo.getWhatIDid || []
            })
         } else {
            res.json({
               success: "SuccessFully Get data",
               response: response[0].whatWeDo
            })
         }
      } else {
         res.json({
            success: "SuccessFully Get data",
            response: []
         })
      }

   } catch (error) {
      res.json({ warning: "Something went wrong" })
   }
}

module.exports = { postMessage, getResumeData, getWhatIDo }