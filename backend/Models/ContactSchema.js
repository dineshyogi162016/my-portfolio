const {default: mongoose, model} = require("mongoose")

const ContactSchema = new mongoose.Schema({
   user : String,
   contactData : {
      name : String,
      email : String,
      phone : String,
      message : String,
      read : Boolean
   }
})

module.exports = mongoose.model("contactUs", ContactSchema)
