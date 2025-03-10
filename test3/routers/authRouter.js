const express=require("express")
const authRouter=express.Router();
const authController=require("../controllers/authController")
const {auth,isAdmin,isStudent}=require("../middleware/authMiddleware")


authRouter.get('/',authController.getTest);
authRouter.post('/signup',authController.signup);
authRouter.post('/login',authController.login)

//auth testing
authRouter.get("/test",auth,(req,res)=>{
  res.json({
    message:"You are authenticated"
  })
})

//Protected route
authRouter.get("/student",auth,isStudent,(req,res)=>{
  res.json({
    message:"You are authenticated as student"
  })
});
authRouter.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    message: "You are authenticated as admin"
  });
});



module.exports=authRouter;