const mongoose=require("mongoose")

const fileSchema=new mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
  },
  imageUrl:{
    type:String,
  },
})

module.exports=mongoose.model("File",fileSchema);