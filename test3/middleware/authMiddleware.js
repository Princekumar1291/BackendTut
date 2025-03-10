const jwt=require("jsonwebtoken")

module.exports.auth=async (req,res,next)=>{
   try {
    //extract jwt token
    const token=req.body.token;
    console.log(token)
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Missing token"
      })
    }

    //veryfy the token
    try {
      const decode=jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode);
      req.user=decode;
    } catch (error) {
      return res.status(401).json({
        success:false,
        message:"Token expired"
      })
    }
    next(); 
   } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Error while verifying token",
      error:error.message
    })
   }

}
module.exports.isStudent=async (req,res,next)=>{
  try {
    const role=req.user.role;
    if(role!="Student"){
      return res.status(401).json({
        success:false,
        message:"You are not authorized as a student",
      })
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Error while check role is student",
      error:error.message
    })
  }
}
module.exports.isAdmin=async (req,res,next)=>{
  try {
    const role=req.user.role;
    if(role!="Admin"){
      return res.status(401).json({
        success:false,
        message:"You are not authorized as a admin",
      })
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Error while check role is admin",
      error:error.message
    })
  }
}