require("dotenv").config();

const express=require("express")
const fileUpload=require("express-fileupload")
const fileRouter = require("./routers/fileRouter");

const app=express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles: true, tempFileDir: '/tmp/'}));

//routing
app.use("/api/v1",fileRouter);

const cloudinaryConnection = require("./config/cloudinary");
const dbConnect = require("./config/db");



const startServer=async()=>{
  try {

    //db connect 
    await dbConnect();

    //connected to cloudinary
    await cloudinaryConnection();

    //start listning
    app.listen(process.env.PORT, () => {
      console.log("Server started at http://localhost:3000");
    });

  } catch (error) {
    console.log("Error while connecting to the DB:", error);
  }
}

startServer();