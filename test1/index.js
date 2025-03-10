require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const app=express()


app.use(express.json());
app.use("/api/v1",todoRoutes);
app.get("/",(req,res)=>{
  res.send("Welcome to Todo App API")
});




mongoose.connect(process.env.DB_URL).then(()=>{
  console.log("DB connected Successfully");
  app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
  })
}).catch(()=>{
  console.log("Error while Db or Server connection")
  process.exit(1);
})