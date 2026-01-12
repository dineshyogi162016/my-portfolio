require("../Connection")

const {default: mongoose, model} = require("mongoose")

const LoginSchema = new mongoose.Schema({
   userDetails : {
      email : String,
      password : String
   },
   authToken : String
})

module.exports = mongoose.model("loginData", LoginSchema)