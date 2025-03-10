require("dotenv").config();

const express=require("express");
const mongoose = require("mongoose");
const authRouter =require("./routers/authRouter")
const cors = require("cors");
const app=express();



app.use(express.json());
app.use(cors());
app.use('/api/v1',authRouter);


mongoose.connect(process.env.DB_URL).
then(()=>{
  console.log("DB is connected")
  app.listen(process.env.PORT,()=>{
    console.log("Server is strted")
  })
}).catch((err)=>{
  console.log("error while connecting to the db")
})