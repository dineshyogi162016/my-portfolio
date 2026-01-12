require("../Connection")

const {default: mongoose, model} = require("mongoose")

const ProfileSchema = new mongoose.Schema({
   user : String,
   adminProfile: {
      profileImage : String,
      userName : String,
      phone : String,
      address : String
   }
})

module.exports = mongoose.model("profiledata", ProfileSchema)