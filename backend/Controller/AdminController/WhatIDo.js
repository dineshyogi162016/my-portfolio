const WhatIDoSchema = require("../../Models/WhatIDoSchema")


const getWhatIDo = async (req, res) => {
   // const {education, experience, headers } = (req.body)
   const user = req.headers.user

   try {

      const response = await WhatIDoSchema.find({user: user})

      if(req.originalUrl === "/admin/getWhatIDoing"){
         if(response[0].whatWeDo){
            res.json({
               success : "SuccessFully Get data",
               response : response[0].whatWeDo.whatIDoing
            })
         }

      }else if(req.originalUrl === "/admin/getWhatIDid"){
         if(response[0].whatWeDo){
            res.json({
               success : "SuccessFully Get data",
               response : response[0].whatWeDo.getWhatIDid
            })
         }
      }

   } catch (error) {
      res.json({warning : "Something went wrong"})
   }
}


const addWhatIDo = async (req, res) => {
   const {whatIDoing, whatIDId, headers } = (req.body)
   const user = headers.user

   let WhatIDoInstance = {}
   let SetwhatIDoing = {}

   if(req.originalUrl === "/admin/addWhatIDoing"){
      WhatIDoInstance = new WhatIDoSchema({
         user : user,
         whatWeDo : {
            whatIDoing : whatIDoing
         }
      }) 

      SetwhatIDoing = {"whatWeDo.whatIDoing": whatIDoing }

   }else if(req.originalUrl === "/admin/addWhatIDid"){
      WhatIDoInstance = new WhatIDoSchema({
         user : user,
         resumeData : {
            whatIDId : whatIDId
         }
      }) 

      SetwhatIDoing = {"whatWeDo.whatIDId": whatIDId }
   }

   
   try {
      const whatWeDoExists =await WhatIDoSchema.findOne({user : user})
      
      if(!whatWeDoExists){
         const response = await WhatIDoInstance.save()
         
         res.json({
            success : "Success Add",
            response : response
         })
         
      }else{
         const response = await WhatIDoSchema.updateOne(
            {user: user},
            {$set : SetwhatIDoing }
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

module.exports = {addWhatIDo, getWhatIDo}