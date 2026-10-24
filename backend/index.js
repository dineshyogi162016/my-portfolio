require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
require("./Connection.js");

const app = express();
const port = process.env.PORT || process.env.PORT_VALUE || 5100;

app.use(express.json());
app.use(cors());

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Health / Testing End Point 
app.get("/", (req, res) => {
   res.send("My-Portfolio server running successfully");
});

// Router for User API's 
const UserRouterAPI = require('./Router/UserRouterAPI.js');
app.use("/user", UserRouterAPI);

// Router for Admin API's 
const AdminRouterAPI = require('./Router/AdminRouterAPI.js');
app.use("/admin", AdminRouterAPI);

// Only start server listener if running locally or outside Vercel serverless
if (!process.env.VERCEL) {
   app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
   });
}

module.exports = app;