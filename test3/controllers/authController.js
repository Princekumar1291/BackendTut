const bcrypt=require('bcryptjs');
const User = require('../models/User');
const jwt=require("jsonwebtoken")

module.exports.getTest=async (req,res)=>{
  res.send("Hello this for the testing")
}

module.exports.signup=async (req,res)=>{
  try {
    let {name,email,password,role}=req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashPassword;
    for (let i = 0; i < 3; i++) {
      try {
        hashPassword = await bcrypt.hash(password, 10);
        password = hashPassword;
        break;
      } catch (error) {
        if (i === 2) {
          return res.status(500).json({
            success: false,
            message: "Error while hashing password",
            error: error.message
          })
        }
      }
    }

    const user=await User.create({name,email,password,role});
    res.status(200).json({
      success:true,
      data:user,
    })
    console.log(name,email,password,role);
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error while signup",
      error:error.message
    })
  }
}

module.exports.login=async (req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"Email and password are required",
      })
    }
    const user=await User.findOne({email});
    if(!user){
      return res.status(401).json({
        success:false,
        message:"User not exit",
      })
    }

    try {
      const checkPass=await bcrypt.compare(password,user.password);
      if(!checkPass){
        return res.status(404).json({
          success:false,
          message:"Password or email are incorrect",
        })
      }
      //jwt creation
      const jwtToken=jwt.sign(
        {
          id:user._id,
          email:user.email,
          role:user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn:"1h"
        }
      )
      const userResponse=user.toObject();
      userResponse.token=jwtToken;
      userResponse.password=undefined;

      //token set
      res
      .cookie("token", jwtToken, { maxAge: 3*24*60*60*1000, httpOnly: true })
      .status(200).json({
        token:jwtToken,
        success:true,
        message:"Your are loggedIn",
        user:userResponse,
      })

    } catch (error) {
      return res.status(404).json({
        success:false,
        message:"Password or email are incorrect",
        error:error
      })
    }

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error while loggedIn",
      error:error
    })
  }
}