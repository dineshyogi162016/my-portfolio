const SignupSchema = require("../../Models/SignupSchema")
const LoginSchema = require("../../Models/LoginSchema")
const secretKey = process.env.JWT_SECRET_KEY || "MySecretKey";
let saltRound = 8
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Signup = async (req, res) => {
   try {   
      const resisterUsers = await SignupSchema.find()   
      let SignupInstance = req.body

      let userName = SignupInstance.name
      let userEmail = SignupInstance.email
      let userPassword = SignupInstance.password

      const userExist = resisterUsers.find(e => e.email === userEmail )
      
      if(userExist){
         res.send({warning : "User already exist"})
      }else{
         bcrypt.hash(userPassword, saltRound , async(err, salt) => {
            if(err){
               console.log("Password hasing error : ", err)
            }else{
               SignupInstance = {
                  name : userName,
                  email : userEmail,
                  password : salt,
                  role : "editor"
               }

               const sigupDetails = SignupSchema(SignupInstance)
               const response = await sigupDetails.save()

               if(response){  
                  res.status(201).send({success: "Signup Success"})
               }else{
                  res.send({warning: "Signup Failed"})
               }

            }
         })
      }

   } catch (error) {
      res.status(500).send({warning: "Something went wrong"})
   }

}

const Login = async (req, res) => {
   const loginDetails = LoginSchema(req.body)
   const resiterUsers = await SignupSchema.find()

   const userEmail = loginDetails.userDetails.email
   const userPassword = loginDetails.userDetails.password
   
   try {
      const isUserExist = resiterUsers.find(e => e.email === userEmail)

      if(!isUserExist){
         res.send({warning: "User not registered"})
      }else{
         
         bcrypt.compare(userPassword, isUserExist.password , (err, result) => {
            if(!result){
               res.send({warning: "Password not correct"})
            }else{

               const payLoad = {email : userEmail}
               const jwtToken = jwt.sign(payLoad , secretKey, {expiresIn: 30 * 60 } )
               
               bcrypt.hash(userPassword, saltRound , async(err, hash) => {
                  if(err){
                     console.log("Password hash Error : ", err )
                  }else{
                     
                     const loginInstance = {
                        userDetails: {
                           email : userEmail,
                           password : hash
                        },
                        authToken: jwtToken
                     }
                     
                     const loginDetails = await LoginSchema.find()
                     const loginOrNot = loginDetails.find(e => e.userDetails.email === userEmail )

                     const loginResponse = {
                        success: "Login success",
                        userName: isUserExist.name,
                        user: isUserExist.email ,
                        authToken: jwtToken
                     }

                     if(!loginOrNot){
                        const response = LoginSchema(loginInstance)
                        const result = await response.save()

                        if(result){
                           res.status(201).send(loginResponse)
                        }else{
                           res.send({warning: "Some issue: try after some time"})
                        }
                     }else{
                        const result = await LoginSchema.updateOne({
                           _id : loginOrNot._id ,
                           $set : loginInstance
                        })

                        if(result.modifiedCount === 1){
                           res.status(201).send(loginResponse)
                        }else{
                           res.send({warning: "something wrong"})
                        }
                     }
                  }
               } )

            }
         })

      }
      
   } catch (error) {
      res.send({warning: "Something went wrong"})
   }

}

const Logout = async (req, res) => {
   try {
      const {user} = req.headers

      let loginDetails = await LoginSchema.find();
      loginDetails =  loginDetails.find(e => e.userDetails.email === user)

      let response =await LoginSchema.updateOne({
         _id : loginDetails._id,
         $set : {
            authToken : null
         }
      })

      if(response.modifiedCount){
         res.json({success: "Logout success"})
      }else{
         res.json({warning: "Something wrong"})
      }
         
   } catch (error) {
      res.json({warning: "Something went wrong"})
   }

}

const checkLogin = async (req, res) => {
   try {
      const {user} = req.headers;
      let loginDetails = await LoginSchema.find();

      loginDetails = loginDetails.find(e => e.userDetails.email === user )

      if(loginDetails.authToken === null ){
         res.json({error : "Not loged in"})
      }else{
         res.json({success: "Loged in"})
      }

   } catch (error) {
      res.json({warning: "Something went wrong"})
   }
}

module.exports = {Signup, Login, Logout, checkLogin}