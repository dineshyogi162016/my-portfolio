import React, { useState } from "react";
import "./mix.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [cshowPass, setCShowPass] = useState(false);
  const [inputvalue, setInputvalue] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    file: null
  });

  const setvalue = (e) => {
    if (e.target.name === "file") {
      // Handle file input change
      setInputvalue({ ...inputvalue, file: e.target.files[0] });
    } else {
      setInputvalue({ ...inputvalue, [e.target.name]: e.target.value });
    }
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword, file } = inputvalue;

    if (!fname || !email || !password || !cpassword || !file) {
      alert("Please fill in all the details");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fname", fname);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("cpassword", cpassword);
      formDataToSend.append("file", file);

      const data = await fetch("http://localhost:8009/register", {
        method: "POST",
        body: formDataToSend
      });




    //   const data = await fetch("http://localhost:8009/register",{
  
    //   method:"POST",
    //   headers:{
    //     "content-type":"application/json",

    //   },
    //   body:JSON.stringify({
    //   email,password
    //    })
    // })
      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        setInputvalue({
          ...inputvalue,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
          file: null
        });
        alert("User registration successful");
      } else {
        alert(res.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while registering user");
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up </h1>
            <p style={{ textAlign: "center" }}>
              Hello, we are glad that you will be using the Register form to
              register yourself! We hope that you will like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <div className="two">
                <input
                  type="text"
                  onChange={(e) => setvalue(e)}
                  value={inputvalue.fname}
                  name="fname"
                  id="fname"
                  placeholder="Enter Your Name"
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <div className="two">
                <input
                  type="email"
                  onChange={setvalue}
                  value={inputvalue.email}
                  name="email"
                  id="email"
                  placeholder="Enter Your Email Address"
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!showPass ? "password" : "text"}
                  onChange={setvalue}
                  value={inputvalue.password}
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {!showPass ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cshowPass ? "password" : "text"}
                  onChange={setvalue}
                  value={inputvalue.cpassword}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCShowPass(!cshowPass)}
                >
                  {!cshowPass ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="file">Image</label>
              <div className="two">
                <input
                  type="file"
                  onChange={setvalue}
                  name="file"
                  id="file"
                  accept="image/*"
                />
              </div>
            </div>
            <button className="btn" onClick={addUserData}>
              Sign Up
            </button>
            <p>
              If you already have an account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;


// Backend Code 


const multer = require('multer');
const path=require("path")
// Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});

// Create the multer instance
const upload = multer({  storage });

module.exports = upload;

// 