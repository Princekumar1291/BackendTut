const Todo = require("../models/Todo")

exports.postTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const response = await Todo.create({ title, description })
    res.status(200).json({
      success: true,
      data: response,
      message: "Todo Data Created"
    });
  } catch (error) {
    console.log("Error While Adding The Todo Data In DB", error);
    res.status(500).json({
      success: false,
      message: "Data is not created",
      response
    });
  }
}

exports.getTodos = async (req, res) => {
  try {
    let response = await Todo.find();
    res.status(200).json({
      success: true,
      data: response,
      message: "Data Fatched"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error While Fetching Data"
    })
  }
}

exports.getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Todo.find({ _id: id });
    console.log(response)

    res.status(200).json({
      success: true,
      data: response,
      message: "Data fetched successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching data"
    })
  }
}

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: response,
      message: "Data deleted successfully"
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error while deleting the data"
    })
  }
}

exports.updateTodo = async (req, res) => {
  try {
    const id=req.params.id;
    let response=await Todo.findById(id);
    if(response==null){
      return res.status(404).json({
        success:true,
        message:"Data not found for updation"
      })
    }
    response.title=req.body.title;
    response.description=req.body.description;
    response.updatedAt=Date.now();
    await response.save();
    console.log(response)
    res.status(200).json({
      success:true,
      data:response,
      message:"Data is updated"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error while updating the todo data"
    })
  }
}