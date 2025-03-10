require("dotenv").config();

const express = require('express');
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoute");

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/v1',blogRouter)



mongoose.connect(process.env.DB_URL).
  then(() => {
    console.log("DB is connected")
    app.listen(process.env.PORT, () => {
      console.log(`server started at http://localhost:${process.env.PORT}`)
    })
  }).
  catch((err) => {
    console.log(err); 
    process.exit(1);
  })