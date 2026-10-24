const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET_KEY || "MySecretKey";

const UserVarifier = (req, res, next) => {
   let Token ;

   if(req.headers.authorization){
      Token = req.headers.authorization
   }else if(req.headers.Authorization){
      Token = req.headers.Authorization
   }else if(req.body && req.body.headers && req.body.headers.Authorization){
      Token = req.body.headers.Authorization
   }

   if(Token){
      jwt.verify(Token, secretKey, (err, valid)=>{
         if(err){
            res.send({ expire: "Provide valid token " } )
         }else{
            next()
         }
      })
   }else{
      res.send({ expire : "Please provide token" } )
   }
}

module.exports = UserVarifier