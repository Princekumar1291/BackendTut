const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
  blog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
  },
  user:{
    type:String,
    require:true,
  },
  body:{
    type:String,
    required:true,
  }
})

module.exports=mongoose.model("Comment",commentSchema);
