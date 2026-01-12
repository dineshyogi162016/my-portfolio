const ContactSchema = require("../../Models/ContactSchema")

const getContactUs = async (req, res) => {
   const {user} = req.headers
   const response =await ContactSchema.find({user : user })

   // console.log("response Contact", response)

   res.json({
      status : 200,
      success : "Data get sucess",
      response : response
   })

}


const deleteMessage = async (req, res) => {
   try {
      const response = await ContactSchema.deleteOne(req.params)
      
      if(response.deletedCount === 1){
         res.json({
            success : "Deleted success",
            response : response
         })
      }else{
         res.json({
            warning : "Something wrong"
         })
      }

   } catch (error) {
      res.json({warning: "Something went wrong"})
   }
}

const readMessage = async (req, res) => {
   try {
      const response =await ContactSchema.updateOne(
         req.params,
         { $set : {"contactData.read" : true} }
      )

      if(response.modifiedCount === 1){
         res.json({
            success : "update success",
            response : response
         })
      }else{
         res.json({
            warning : "something wrong"
         })
      }

   } catch (error) {
      res.json({warning: "Something went wrong"})
   }
}

const unReadMessage = async (req, res) => {
   try {
      const response =await ContactSchema.updateOne(
         req.params,
         { $set : {"contactData.read" : false} }
      )

      if(response.modifiedCount === 1){
         res.json({
            success : "update success",
            response : response
         })
      }else{
         res.json({
            warning : "something wrong"
         })
      }

   } catch (error) {
      res.json({warning: "Something went wrong"})
   }
}

module.exports = {getContactUs, deleteMessage, readMessage, unReadMessage}