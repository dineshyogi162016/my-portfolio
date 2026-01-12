const ProfileSchema = require("../../Models/ProfileSchema")
const { updateOne } = require("../../Models/SignupSchema")

const profilePost = async(req, res) => {
     
   try {

      const imageURL = req.file.filename
      const userName = req.body.userName
      const user = req.headers.user

      const response = new ProfileSchema({
         user : user,
         adminProfile : {
            profileImage : imageURL,
            userName : userName,
         }
      })

      const ifUserExits = await ProfileSchema.findOne({"user" : user})

      if(!ifUserExits){

         const result = await response.save()
         
         if(result){
            res.json({
               status : 201,
               success : "Profile Posted",
               data : result
            })
         }else{
            res.json({
               warning : "Something wrong"
            })
         }

      }else{

         const result = await ProfileSchema.updateOne({
            _id : ifUserExits._id , 
            $set : response
         })

         console.log("ifUserExits", result)
         if(result.modifiedCount === 1){
            res.json({
               success : "Update profile success",
               status : 200 
            })
         }else{
            res.json({
               warning : "Something wrong",
               status : 200 
            })
         }
      }

   } catch (error) {
      res.json({warning: "Something went wrong"})
   }
}

const getProfile = async(req, res) => {
   const user = req.headers.user

   const result = await ProfileSchema.findOne({"user" : user})

   res.json({
      status: 200,
      response: result
   })

}

module.exports = {profilePost, getProfile}