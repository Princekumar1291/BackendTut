const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    emum:["Admin","Student","Visitor"]
  }
})

module.exports=mongoose.model("User",userSchema)
