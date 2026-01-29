const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT_VALUE || 4200

app.use(express.json())
app.use(cors())

// Router for User API's 
const UserRouterAPI = require('./Router/UserRouterAPI') 
app.use("/user", UserRouterAPI );

// Router for Admin API's 
const AdminRouterAPI = require('./Router/AdminRouterAPI') 
app.use("/admin", AdminRouterAPI );


// app.listen(port, ()=> {
//    console.log(`Server is running on port http://localhost:${port}`)
// })