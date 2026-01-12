require("../Connection")
const { default: mongoose } = require('mongoose')

const SignupSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
   role: String
})

module.exports = mongoose.model("signupdatas", SignupSchema)