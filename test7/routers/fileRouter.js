const express=require("express")
const fileRouter=express.Router();
const fileController=require("../controllers/fileController")

fileRouter.get("/test",fileController.getTest);

fileRouter.post("/localFileUpload",fileController.postLocalFileUpload)
fileRouter.post("/cloudinaryFileUpload",fileController.postCloudinaryFile)
fileRouter.post("/cloudinaryVedioUpload",fileController.postVideoUpload)

fileRouter.post("/cloudinaryFileUploadReduced",fileController.cloudinaryFileUploadReduced)

module.exports=fileRouter;