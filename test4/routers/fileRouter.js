const express=require("express")
const fileRouter=express.Router();
const fileController=require("../controllers/fileController")

fileRouter.get("/test",fileController.getTest);

fileRouter.post("/localFileUpload",fileController.postLocalFileUpload)

module.exports=fileRouter;