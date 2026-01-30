// const express = require("express")
import express from "express";
const app = express()
// const cors = require("cors")
import cors from "cors";
// const dotenv = require("dotenv")
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT_VALUE || 4200

app.use(express.json())
app.use(cors())

// Router for User API's 
import UserRouterAPI from './Router/UserRouterAPI.js' 
app.use("/user", UserRouterAPI );

// Router for Admin API's 
import AdminRouterAPI from './Router/AdminRouterAPI.js' 
app.use("/admin", AdminRouterAPI );


// app.listen(port, ()=> {
//    console.log(`Server is running on port http://localhost:${port}`)
// })

export default app;