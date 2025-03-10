const express=require("express")
const todoRoutes=express.Router();
const todoController = require("../controllers/todoController")

todoRoutes.post("/todo",todoController.postTodo);
todoRoutes.get("/todo",todoController.getTodos);
todoRoutes.get("/todo/:id",todoController.getTodo)
todoRoutes.delete("/todo/:id",todoController.deleteTodo)
todoRoutes.put("/todo/:id",todoController.updateTodo)


module.exports=todoRoutes;