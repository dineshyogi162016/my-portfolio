const {default: mongoose, model} = require("mongoose")

const ResumeSchema = new mongoose.Schema({
   user : String,
   resumeData : {
      education : [{
         educationType : String,
         educationName : String,
         marks : String,
         passingYear : String
      }],
      experience : [{
         jobRole : String,
         destination : String,
         startDate : String,
         endDate : String,
         aboutExperience : String
      }],
      hobbies : String
   }
})

module.exports = mongoose.model("resume", ResumeSchema)
