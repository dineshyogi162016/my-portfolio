const {default: mongoose, model} = require("mongoose")

const WhatIDoSchema = new mongoose.Schema({
   user : String,
   whatWeDo : {
      whatIDoing : [{
         whatIDoLogo : String,
         whatIDoHeading : String,
         whatIDoContent : String
      }],
      whatIDId : {
         hoursOfWork : String,
         projectsDone : String,
         satisfiedCustomers : String,
         awardsWin : String
      }
   }
})

module.exports = mongoose.model("whatido", WhatIDoSchema)
