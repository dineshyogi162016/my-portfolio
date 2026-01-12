const ResumeSchema = require("../../Models/ResumeSchema")


// API's for Education 
const getEducationData = async (req, res) => {
   // const {education, experience, headers } = (req.body)
   const user = req.headers.user

   try {

      const response = await ResumeSchema.find({user: user})

      if(req.originalUrl === "/admin/getExperienceData"){
         if(response[0].resumeData){
            res.json({
               success : "SuccessFully Get data",
               response : response[0].resumeData.experience
            })
         }

      }else if(req.originalUrl === "/admin/getEducationData"){
         if(response[0].resumeData){
            res.json({
               success : "SuccessFully Get data",
               response : response[0].resumeData.education
            })
         }
      }

   } catch (error) {
      res.json({warning : "Something went wrong"})
   }
}


// Add only education data in resume
// const addEducationInResume = async (req, res) => {
//    const {education, headers } = (req.body)
//    const user = headers.user


//    try {
//       const ResumeExists =await ResumeSchema.findOne({user : user})
      
//       const ResumeInstance = new ResumeSchema({
//          user : user,
//          resumeData : {
//             education : education
//          }
//       }) 

//       if(!ResumeExists){
//          const response = await ResumeInstance.save()

//          res.json({
//             success : "Success Add",
//             response : response
//          })

//       }else{
//          const response = await ResumeSchema.updateOne(
//             {user: user},
//             {$set : { "resumeData.education": education }}
//          )
         
//          if(response.modifiedCount === 1){
//             res.json({
//                success : "update success",
//                response : response
//             })
//          }else{
//             res.json({warning : "Something wrong"})
//          }

//       }
      
//    } catch (error) {
//       res.json({warning : "Something went wrong"})
//    }
// }

// const updateEducation = async (req, res) => {
//    const user = req.headers.user
//    const {education, experience} = (req.body).resumeData

//    try {
//       const ResumeInstance = {
//          resumeData : {
//             education : education,
//             experience : experience
//          }
//       }

//       const response = await ResumeSchema.updateOne(
//          {user: user},
//          {$set : ResumeInstance}
//       )

//       res.json({
//          success : "update success",
//          response : response
//       })

//    }catch (error){
//       res.json({warning : "Something went wrong"})
//    }
// }


// API's for Experience

const addDataInResume = async (req, res) => {
   const {education, experience, headers } = (req.body)
   const user = headers.user

   let ResumeInstance = {}
   let SetResumeData = {}

   if(req.originalUrl === "/admin/addEducationInResume"){
      ResumeInstance = new ResumeSchema({
         user : user,
         resumeData : {
            education : education
         }
      }) 

      SetResumeData = {"resumeData.education": education }

   }else if(req.originalUrl === "/admin/addExperienceInResume"){
      ResumeInstance = new ResumeSchema({
         user : user,
         resumeData : {
            experience : experience
         }
      }) 

      SetResumeData = {"resumeData.experience": experience }
   }

   try {
      const ResumeExists =await ResumeSchema.findOne({user : user})
      
      if(!ResumeExists){
         const response = await ResumeInstance.save()
         
         res.json({
            success : "Success Add",
            response : response
         })
         
      }else{
         const response = await ResumeSchema.updateOne(
            {user: user},
            {$set : SetResumeData }
         )

         if(response.modifiedCount === 1){
            res.json({
               success : "update success",
               response : response
            })
         }else{
            res.json({warning : "Something wrong"})
         }

      }
      
   } catch (error) {
      res.json({warning : "Something went wrong"})
   }
}


module.exports = {getEducationData, addDataInResume}