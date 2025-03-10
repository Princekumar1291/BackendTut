const path=require("path")
module.exports.getTest=(req,res)=>{
  res.send("This is for testing")
}


//local file upload
module.exports.postLocalFileUpload=async (req,res)=>{
  try {
    const {name,email}=req.body;
    const {image}=req.files;

    const rootPath = path.dirname(require.main.filename);
    const filePath=path.join(rootPath,"files",Date.now()+image.name);
    // console.log(image)

    image.mv(filePath, (error) => {
      if (error) {
        console.log("Error while adding file to local", error);
        return res.status(500).json({
          success: false,
          message: "Error while moving file",
          error: error,
        });
      }
    });
    
    res.status(200).json({
      success:true,
      message:"File uploaded successfully",
    })
  } catch (error) {
    console.log("Error in the controler of file",error)

  }
}