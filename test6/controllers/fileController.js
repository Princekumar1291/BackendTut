const path = require("path");
const cloudinary = require("cloudinary").v2;
const File = require("../models/File")
module.exports.getTest = (req, res) => {
  res.send("This is for testing")
}


//local file upload
module.exports.postLocalFileUpload = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { image } = req.files;

    const rootPath = path.dirname(require.main.filename);
    const filePath = path.join(rootPath, "files", Date.now() + image.name);
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
      success: true,
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.log("Error in the controler of file", error)

  }
}

//to cloudinary
module.exports.postCloudinaryFile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { image } = req.files;
    // console.log(name,email,image);

    //validation
    const fileSupported = ["jpeg", "png", "gif", "jpg"]
    const fileType = image.name.split('.')[1].toLowerCase();
    if (!fileSupported.includes(fileType)) {
      return res.json({
        success: false,
        message: "File type not supported",
        supportedFileTypes: fileSupported,
      })
    }

    const imageUploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "CloudinaryTest",
      resource_type: "image",
    }
    );

    await File.create({ name, email, imageUrl: imageUploadResult.secure_url });

    res.status(200).json({
      success: true,
      message: "File uploaded to cloudinary successfully",
      imageurl: imageUploadResult,
    })

  } catch (error) {
    console.log("Error in the controler of cloudinary", error)
  }
}

//video upload

module.exports.postVideoUpload = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { video } = req.files;

    //validation
    const supportedTypes = ['mp4', 'mov'];
    const fileType = video.name.split('.')[1].toLowerCase();

    console.log(video)
    console.log(fileType)

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
        supportedFileTypes: supportedTypes,
      })
    }

    if (video.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size should be less than 5mb",
      })
    }

    const videoFileUpload = await cloudinary.uploader.upload(video.tempFilePath, {
      resource_type: "video",
      folder: "CloudinaryTest"
    })

    console.log(videoFileUpload);

    res.status(200).json({
      success: true,
      message: "Video uploaded to Cloudinary successfully",
      videoUrl: videoFileUpload.secure_url,
    })

  } catch (error) {
    console.log("Error in the controller of video upload", error)
    res.status(500).json({
      success: false,
      message: "Error in the controler of video upload",
      error: error,
    })
  }
}

//reduced image 
module.exports.cloudinaryFileUploadReduced = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { image } = req.files;
    // console.log(name,email,image);

    //validation
    const fileSupported = ["jpeg", "png", "gif", "jpg"]
    const fileType = image.name.split('.')[1].toLowerCase();
    if (!fileSupported.includes(fileType)) {
      return res.json({
        success: false,
        message: "File type not supported",
        supportedFileTypes: fileSupported,
      })
    }

    const imageUploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "CloudinaryTest",
      resource_type: "image",
      quality: "auto:good",
      quality: 90,
    }
    );

    await File.create({ name, email, imageUrl: imageUploadResult.secure_url });

    res.status(200).json({
      success: true,
      message: "File uploaded to cloudinary successfully",
      imageurl: imageUploadResult,
    })

  } catch (error) {
    console.log("Error in the controler of cloudinary", error)
  }
}