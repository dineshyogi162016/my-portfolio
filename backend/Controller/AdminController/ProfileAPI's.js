const ProfileSchema = require("../../Models/ProfileSchema")
const { updateOne } = require("../../Models/SignupSchema")

const profilePost = async(req, res) => {
   try {
      const user = req.headers.user
      const userName = req.body.userName
      const ifUserExits = await ProfileSchema.findOne({"user" : user})

      const imageURL = req.file 
         ? req.file.filename 
         : (ifUserExits && ifUserExits.adminProfile ? ifUserExits.adminProfile.profileImage : "");

      if(!ifUserExits){
         const newProfile = new ProfileSchema({
            user : user,
            adminProfile : {
               profileImage : imageURL,
               userName : userName,
            }
         })

         const result = await newProfile.save()
         
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

         const updatePayload = {
            "adminProfile.userName": userName
         };
         if (imageURL) {
            updatePayload["adminProfile.profileImage"] = imageURL;
         }

         const result = await ProfileSchema.updateOne(
            { _id : ifUserExits._id },
            { $set : updatePayload }
         )

         console.log("ifUserExits", result)
         if(result.modifiedCount >= 1 || result.acknowledged){
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
      console.log("profilePost error:", error)
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